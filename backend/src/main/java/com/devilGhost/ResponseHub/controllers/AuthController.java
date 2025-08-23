package com.devilGhost.ResponseHub.controllers;

import com.devilGhost.ResponseHub.dto.LoginRequest;
import com.devilGhost.ResponseHub.dto.SignUpRequest;
import com.devilGhost.ResponseHub.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api/server/auth")
public class AuthController {
    // inject the service layer
    @Autowired
    private AuthService authService;

    // this controller is to authenticate user from database
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        try{

            if(loginRequest.getUsername().isBlank() || loginRequest.getPassword().length()<6 ){
                // giving message as "Invalid credentials" and not specific to avoid information leaks
                // this also prevent Attacks like User Enumeration attack
                throw new BadCredentialsException("Invalid Credentials");
            }
            return authService.login(loginRequest);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error",e.getMessage()));

        }
    }

    // this controller is to register user in database
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signupRequest){
        try {
            // throwing exceptions with different error message to help user signup easily
            if(signupRequest.getName().isBlank()){
                throw new BadCredentialsException("Name must not be blank.");
            }
            if(signupRequest.getUsername().isBlank()){
                throw new BadCredentialsException("Username must not be blank.");
            }
            if (signupRequest.getPassword().length()<6){
                throw new BadCredentialsException("Password length must be least 6.");
            }

            return authService.signup(signupRequest);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error",e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){

        Cookie cookie=new Cookie("jwt","");

        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of("message","Successfully logged you out!"));

    }

}
