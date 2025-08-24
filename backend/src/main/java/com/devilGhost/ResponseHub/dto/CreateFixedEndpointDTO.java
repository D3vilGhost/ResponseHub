package com.devilGhost.ResponseHub.dto;

import lombok.Getter;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Getter
public class CreateFixedEndpointDTO {

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
        if(endpoint.isBlank()){
            return "Endpoint can't be empty.";
        }
        // check for url-safeness of endpoint here

        return null;
    }
}
