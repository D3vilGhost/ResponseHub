package com.devilGhost.ResponseHub.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//@Component
public class CustomCredentialsFilter extends OncePerRequestFilter {
    // this is the filter which runs before UsernamePasswordAuthenticationFilter
    // based on the url of requests , whether its /api/client or /api/server
    // it redirects to either ApiKeyAuthenticationFilter or JwtAuthenticationFilter respectively
    @Autowired
    private ApiKeyAuthenticationFilter apiKeyAuthenticationFilter;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(request.getRequestURI().startsWith("/api/client/")){
            // we need to check for api-key
            apiKeyAuthenticationFilter.doFilterInternal(request,response,filterChain);
            return;
        }
        // else we will need to check for jwt token
        jwtAuthenticationFilter.doFilterInternal(request,response,filterChain);
        return;

    }
}
