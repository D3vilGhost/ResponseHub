package com.devilGhost.ResponseHub.dto;

import lombok.Setter;

import java.util.Map;

@Setter
public class FlexibleResponseDTO {

    private Map<String,Object> data;
    private Map<String,String> error;
}
