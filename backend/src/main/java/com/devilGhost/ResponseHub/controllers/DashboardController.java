package com.devilGhost.ResponseHub.controllers;

import com.devilGhost.ResponseHub.dto.FixedEndpointDTO;
import com.devilGhost.ResponseHub.services.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/server/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/fixed")
    public ResponseEntity<?> getFixedEndpoints(@AuthenticationPrincipal User user){
        try {
            // there is not much to check in controller still using try catch
            // it allows to handle unhandled cases
            return dashboardService.getFixedEndpoints(user.getUsername());

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }

    @PostMapping("/fixed")
    public ResponseEntity<?> createFixedEndpoint(
            @AuthenticationPrincipal User user,
            @RequestBody FixedEndpointDTO newFixedEndpoint
    ){
        try {

            String constraintError=newFixedEndpoint.checkConstraintsOnFields();
            if(constraintError!=null){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error",constraintError));
            }

            return dashboardService.createFixedEndpoint(user.getUsername(),newFixedEndpoint);

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }

    @PutMapping("/fixed")
    public ResponseEntity<?> updateFixedEndpoint(
            @AuthenticationPrincipal User user,
            @RequestBody FixedEndpointDTO endpointToBeUpdated
    ){
        try {

            String constraintError=endpointToBeUpdated.checkConstraintsOnFields();

            if(constraintError!=null){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error",constraintError));
            }

            return dashboardService.updateFixedEndpoint(user.getUsername(),endpointToBeUpdated);

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }

    @DeleteMapping("/fixed")
    public ResponseEntity<?> deleteFixedEndpoint(
            @AuthenticationPrincipal User user,
            @RequestParam("method") String method, @RequestParam("endpoint") String endpoint
    ){
        try {

            if(method.isBlank() || endpoint.isBlank()){
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("error","Specify the resource to be deleted."));
            }
            // not much to do in controller layer
            return dashboardService.deleteFixedEndpoint(user.getUsername(),method,endpoint);

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }


    @GetMapping("/records")
    public ResponseEntity<?> getUsersRecords(@AuthenticationPrincipal User user, @RequestParam int page){
        try {
            // not much to check in controller layer
            return dashboardService.getRecords(user.getUsername(),page);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }

    @DeleteMapping("/records")
    public ResponseEntity<?> deleteUsersRecords(@AuthenticationPrincipal User user ){
        try {
            // not much to check in controller layer
            return dashboardService.deleteRecords(user.getUsername());
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }

}
