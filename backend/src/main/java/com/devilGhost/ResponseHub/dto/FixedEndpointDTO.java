package com.devilGhost.ResponseHub.dto;

import lombok.Getter;

@Getter
public class FixedEndpointDTO {

    private String method;
    private int statusCode;
    private String endpoint;
    private String responseBody; // will receive it as a string via JSON.stringify from frontend

    public String checkConstraintsOnFields(){
        if(method.isBlank() || endpoint.isBlank() || responseBody.isBlank()){
            return "Fields can't be empty.";
        }

        // below is the endpoint validation logic

        // 1) trailing/leading white space removal
        endpoint=endpoint.trim();
        // 2) replace "\\" , "//" , "\" all with single forward slash "/"
        endpoint=endpoint.replace("\\\\","/");
        endpoint=endpoint.replace("\\","/");
        endpoint=endpoint.replace("//","/");
        // 3) whitespace check in between of endpoint
        if(endpoint.contains(" ")){
            return "Endpoint cannot contain white spaces in between.";
        }
        // 4) allowed chars match using regex
        if(!endpoint.matches("^[a-zA-Z0-9/.-_=?&]+$")){
            return "Only following characters are allowed during endpoint creation: " +
                    "Alphanumeric(a-zA-Z0-9), Dot(.), Dash(-), Underscore(_), EqualTo(=), QuestionMark(?) and Ampersand(&).";
        }
        // finally we have a valid endpoint
        return null;
    }
}
