package com.devilGhost.ResponseHub.controllers;

import com.devilGhost.ResponseHub.dto.FlexibleRequestDTO;
import com.devilGhost.ResponseHub.services.ClientRequestService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/client")
public class ClientRequestController {

    @Autowired
    private ClientRequestService clientRequestService;

    @RequestMapping("/fixed/**")
    public ResponseEntity<?> fixedRequestController(
            @AuthenticationPrincipal User user,
            HttpServletRequest request
    ){
        return clientRequestService.fixedRequestService(
                user.getUsername(),
                request.getMethod(),
                request.getRequestURI().substring(17) // to remove "/api/client/fixed/" part
        );
    }

    @PostMapping("/flexible")
    public ResponseEntity<?> flexibleRequestController(
            @AuthenticationPrincipal User user,
            @RequestBody FlexibleRequestDTO requestedData
    ){
        return clientRequestService.flexibleRequestService(
                user.getUsername(),
                requestedData
        );
    }
}
