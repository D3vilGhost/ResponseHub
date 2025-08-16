package com.devilGhost.ResponseHub.dto;

import lombok.Data;

@Data
public class UserSignupRequest {
    private String name;
    private String username;
    private String password;
}
