package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.dto.LoginRequest;
import com.devilGhost.ResponseHub.dto.SignUpRequest;
import com.devilGhost.ResponseHub.jwt.JwtService;
import com.devilGhost.ResponseHub.models.UserEntity;
import com.devilGhost.ResponseHub.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public ResponseEntity<?> login(LoginRequest loginRequest){
        try{
            Optional<UserEntity> userOptional = userRepository.findByUsername(loginRequest.getUsername());
            if(userOptional.isEmpty()){
                throw new BadCredentialsException("Invalid username.");
            }
            if(!passwordEncoder.matches(loginRequest.getPassword(), userOptional.get().getPassword())){
                throw new BadCredentialsException("Wrong Password.");
            }

            // create cookie
            HttpHeaders cookieHeader=jwtService.generateTokenAndCookieHeader(userOptional.get().getUsername());
            // set cookie in response
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .headers(cookieHeader)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("username",userOptional.get().getUsername()));
        }
        catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error",e.getMessage()));
        }
        catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error."));

        }

    }

    public ResponseEntity<?> signup(SignUpRequest signupRequest){
        try{
            Optional<UserEntity> optionalUser = userRepository.findByUsername(signupRequest.getUsername());
            if (optionalUser.isPresent()) {
                throw new BadCredentialsException("This username is already taken.");
            }

            UserEntity newUser=new UserEntity();
            newUser.setName(signupRequest.getName());
            newUser.setUsername(signupRequest.getUsername());
            newUser.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            newUser.setApiKey(UUID.randomUUID().toString());
            newUser.setRecords(new ArrayList<>());

            userRepository.save(newUser);

            HttpHeaders cookieHeader=jwtService.generateTokenAndCookieHeader(newUser.getUsername());

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .headers(cookieHeader)
                    .body(Map.of("username",newUser.getUsername()));

        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error",e.getMessage()));
        }
        catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("error","Internal Server Error"));
        }
    }

}
