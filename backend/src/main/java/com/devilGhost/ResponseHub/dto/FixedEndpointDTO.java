package com.devilGhost.ResponseHub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FixedEndpointDTO {

    private String method;
    private int statusCode;
    private String endpoint;
    private Object responseBody;
    // will receive it as a string from frontend
}
