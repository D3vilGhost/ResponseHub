package com.devilGhost.ResponseHub.controllers;

import com.devilGhost.ResponseHub.dto.ClientResponseDTO;
import com.devilGhost.ResponseHub.dto.FlexibleRequestDTO;
import com.devilGhost.ResponseHub.services.ClientRequestService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/client")
public class ClientRequestController {

    @Autowired
    private ClientRequestService clientRequestService;

    @RequestMapping("/fixed/**")
    public ResponseEntity<?> fixedRequestController(
            @AuthenticationPrincipal User user,
            HttpServletRequest request
    ) {
        try {

            return clientRequestService.fixedRequestService(
                    user.getUsername(),
                    request.getMethod(),
                    request.getRequestURI()
            );
        } catch (Exception e) {
            // though we won't ever hit this catch block still have added it ,
            // and won't add this error in user's record however it's log will be generated for
            // future upgrades and improvements
            log.error(e.getMessage());
            // for client response , just generate a standard client type error,
            // without any interaction with records.
            ClientResponseDTO clientResponseDTO = new ClientResponseDTO();
            clientResponseDTO.setData(null);
            clientResponseDTO.setError("Internal Server Error.", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(clientResponseDTO);

        }
    }

    @PostMapping("/flexible")
    public ResponseEntity<?> flexibleRequestController(
            @AuthenticationPrincipal User user,
            @RequestBody FlexibleRequestDTO requestedData
    ) {
        try {
            // i will handle requestedData validation in service layer itself, cuz
            // in case of invalid , i would need to add record of it as well
            return clientRequestService.flexibleRequestService(
                    user.getUsername(),
                    requestedData
            );
        } catch (Exception e) {
            // same as fixed , i won't probably hit this block, but in-case if i did,
            // add a log and send a client side type response
            log.error(e.getMessage());

            ClientResponseDTO clientResponseDTO = new ClientResponseDTO();
            clientResponseDTO.setData(null);
            clientResponseDTO.setError("Internal Server Error.", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(clientResponseDTO);
        }
    }
}
