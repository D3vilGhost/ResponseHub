package com.devilGhost.ResponseHub.controllers;

import com.devilGhost.ResponseHub.dto.UserLoginRequest;
import com.devilGhost.ResponseHub.dto.UserSignupRequest;
import com.devilGhost.ResponseHub.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    // inject the service layer
    @Autowired
    AuthService authService;

    // this controller is to authenticate user from database
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest userLoginRequest){
        try{
            // pass login data to service layer
//            if(userLoginRequest.)
            return authService.login(userLoginRequest);
        } catch (Exception e) {
            // if there's any error print error to console and return error
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    // this controller is to register user in database
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserSignupRequest userSignupRequest){
        try {
            // pass signup data to service layer
            return authService.signup(userSignupRequest);
        } catch (Exception e) {
            // if there's any error print error to console and return error
            System.out.println(e.getMessage());
            System.out.println("hello");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

}
