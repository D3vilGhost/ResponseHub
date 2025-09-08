package com.devilGhost.ResponseHub.dto;

import lombok.Getter;

@Getter
public class FlexibleRequestDTO {
    private int statusCode;
    private Object responseBody;
    // we will initially get it as string and will validate it in service layer
}
