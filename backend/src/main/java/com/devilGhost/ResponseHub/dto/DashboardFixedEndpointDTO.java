package com.devilGhost.ResponseHub.dto;

import lombok.Getter;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Getter
public class DashboardFixedEndpointDTO {

    private String method;
    private int statusCode;
    private String endpoint;
    private String responseBody; // will receive it as a string via JSON.stringify from frontend

    public String checkConstraintsOnFields(){
        if(method.isBlank()){
            return "Method can't be empty.";
        }
        if(responseBody.isBlank()){
            return "Response-Body can't be empty.";
        }
        // check for url-safeness of endpoint
        String encodedEndpoint = URLEncoder.encode(endpoint, StandardCharsets.UTF_8);
        if(!encodedEndpoint.equals(endpoint)){
            return "Endpoint must contain URL safe characters only.";
        }
        return null;
    }
}
