package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.dto.LoginRequestDTO;
import com.devilGhost.ResponseHub.dto.SignUpRequestDTO;
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

    public ResponseEntity<?> login(LoginRequestDTO loginRequestDTO){
        try{
            Optional<UserEntity> userOptional = userRepository.findByUsername(loginRequestDTO.getUsername());
            if(userOptional.isEmpty()){
                throw new BadCredentialsException("Invalid username.");
            }
            if(!passwordEncoder.matches(loginRequestDTO.getPassword(), userOptional.get().getPassword())){
                throw new BadCredentialsException("Wrong Password.");
            }

            // create cookie
            HttpHeaders cookieHeader=jwtService.generateTokenAndCookieHeader(userOptional.get().getUsername());
            // set cookie in response
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .headers(cookieHeader)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "username",userOptional.get().getUsername(),
                            "apiKey",userOptional.get().getApiKey()
                    ));
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

    public ResponseEntity<?> signup(SignUpRequestDTO signupRequestDTO){
        try{
            Optional<UserEntity> optionalUser = userRepository.findByUsername(signupRequestDTO.getUsername());
            if (optionalUser.isPresent()) {
                throw new BadCredentialsException("This username is already taken.");
            }

            UserEntity newUser=new UserEntity();
            newUser.setName(signupRequestDTO.getName());
            newUser.setUsername(signupRequestDTO.getUsername());
            newUser.setPassword(passwordEncoder.encode(signupRequestDTO.getPassword()));
            newUser.setApiKey(passwordEncoder.encode(UUID.randomUUID().toString()));// hash the api-key as well

            userRepository.save(newUser);

            HttpHeaders cookieHeader=jwtService.generateTokenAndCookieHeader(newUser.getUsername());

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .headers(cookieHeader)
                    .body(Map.of(
                            "username",newUser.getUsername(),
                            "apiKey", newUser.getApiKey()
                    ));

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
