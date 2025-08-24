package com.devilGhost.ResponseHub.config;

import com.devilGhost.ResponseHub.models.UserEntity;
import com.devilGhost.ResponseHub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Optional;

@Component // spring automatically see this and overrides default
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // loadUserByUsername method is used when we are handling  "/api/server/**"
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> user=userRepository.findByUsername(username);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User not found with username:" + username);
        }
        return new User(user.get().getUsername(),user.get().getPassword(), Collections.emptyList());
    }

    // loadUserByApiKey method is used when we are handling  "/api/client/**"
    public UserDetails loadUserByApiKey(String apiKey) throws UsernameNotFoundException {
        Optional<UserEntity> user=userRepository.findByApiKey(apiKey);
        if (user.isEmpty()){
            throw new UsernameNotFoundException("User not found with api-key:" + apiKey);
        }
        return new User(user.get().getUsername(),user.get().getPassword(),Collections.emptyList());
    }
}
