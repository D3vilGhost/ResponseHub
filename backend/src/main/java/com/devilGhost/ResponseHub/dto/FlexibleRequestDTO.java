package com.devilGhost.ResponseHub.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;

import java.util.Map;

@Getter
public class FlexibleRequestDTO {
    private int status_code;
    private Map<String, JsonNode> response_schema;
}
