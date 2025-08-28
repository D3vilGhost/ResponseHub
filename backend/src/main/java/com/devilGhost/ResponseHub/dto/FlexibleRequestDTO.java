package com.devilGhost.ResponseHub.dto;

import lombok.Getter;

@Getter
public class FlexibleRequestDTO {
    private int status_code;
    private String response_schema;
    // we will initially get it as string and will format it in service layer
}
