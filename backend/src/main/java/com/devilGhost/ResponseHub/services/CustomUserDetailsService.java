package com.devilGhost.ResponseHub.services;

import com.devilGhost.ResponseHub.models.UserModel;
import com.devilGhost.ResponseHub.repository.UserModelRepository;
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
    private UserModelRepository userModelRepository;
    // custom userDetailService class is required to let spring security know from where
    // to look for user while authorization
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> user=userModelRepository.findByUsername(username);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("User not found with username:"+username);
        }
        // in case we have found the user pass his details in User object maintained by spring.
        return new User(user.get().getUsername(),user.get().getPassword(), Collections.emptyList());
    }
}
