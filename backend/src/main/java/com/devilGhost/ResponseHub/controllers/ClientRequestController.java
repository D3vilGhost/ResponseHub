package com.devilGhost.ResponseHub.controllers;

import com.devilGhost.ResponseHub.dto.FlexibleRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/client")
public class ClientRequestController {

    @RequestMapping("/fixed/{endpoint}")
    public ResponseEntity<?> fixedRequestController(
            @AuthenticationPrincipal User user,
            @RequestParam("endpoint") String endpoint
    ){
        return ResponseEntity
                .status(HttpStatus.IM_USED)
                .body(user.getUsername()+"\n"+endpoint);
    }

    @PostMapping("/flexible")
    public ResponseEntity<?> flexibleRequestController(
            @AuthenticationPrincipal User user,
            @RequestBody FlexibleRequestDTO requestedData
            ){
        return ResponseEntity
                .status(HttpStatus.I_AM_A_TEAPOT)
                .body(user.getUsername()+"\n"+requestedData.toString());

    }
}
