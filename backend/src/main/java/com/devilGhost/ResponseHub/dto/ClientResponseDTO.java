package com.devilGhost.ResponseHub.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
public class ClientResponseDTO {
    private Object data;
    private Map<String, String> error;

    public void setError(String message, String details) {
        this.error = new HashMap<>();
        this.error.put("message", message);
        this.error.put("details", details);
    }
}
