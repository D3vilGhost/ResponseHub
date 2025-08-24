package com.devilGhost.ResponseHub.dto;

import lombok.Getter;

@Getter
public class EditFixedEndpointDTO {
    private String oldMethod;
    private String newMethod;

    private String oldEndpoint;
    private String newEndpoint;

    private int oldStatusCode;
    private int newStatusCode;

    private String oldResponseBody;
    private String newResponseBody;

    // constraint check must be dont after fetch from db
    public String checkConstraintsOnFields() {
        if(newMethod.isBlank() || newEndpoint.isBlank() || newResponseBody.isBlank()){
            return "Fields can't be empty.";
        }
        if(
            oldMethod.equals(newMethod) &&
            oldEndpoint.equals(newEndpoint) &&
            oldResponseBody.equals(newResponseBody) &&
            oldStatusCode==newStatusCode
        ){
          return "Change at-least one field to update.";
        }
        // do a newEndpoint url safeness check here :

        return null;
    }
}
