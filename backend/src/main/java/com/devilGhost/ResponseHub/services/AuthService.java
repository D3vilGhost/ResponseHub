package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.dto.UserLoginRequest;
import com.devilGhost.ResponseHub.dto.UserSignupRequest;
import com.devilGhost.ResponseHub.models.UserModel;
import com.devilGhost.ResponseHub.repository.UserModelRepository;
import com.mongodb.DuplicateKeyException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class AuthService {
    @Autowired
    private UserModelRepository userModelRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> signup(UserSignupRequest userSignupRequest){
        // if username already exists
        String hashedPassword = passwordEncoder.encode(userSignupRequest.getPassword());

        UserModel userModel =new UserModel();
        userModel.setUsername(userSignupRequest.getUsername());
        userModel.setName(userSignupRequest.getName());
        userModel.setPassword(hashedPassword);
        // generate a unique api-key based on user's username
        userModel.setApiKey(UUID.randomUUID().toString());
        try {
            UserModel savedUserModel = userModelRepository.save(userModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUserModel); // Return 201 Created with the saved user
        } catch (DuplicateKeyException e) {
            // username already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists"); // Return 409 Conflict
        } catch (Exception e) {
            // some error
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user"); // Return 500 Internal Server Error
        }
    }

    public ResponseEntity<?> login(UserLoginRequest userLoginRequest){
        Optional<UserModel> userOptional = userModelRepository.findByUsername(userLoginRequest.getUsername());
        if(userOptional.isPresent()){
            UserModel userModel =userOptional.get();
            if(passwordEncoder.matches(userLoginRequest.getPassword(), userModel.getPassword())){
                return ResponseEntity.status(HttpStatus.OK).body(userModel);
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Paswword.");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("username not found!");
        }
    }

}
