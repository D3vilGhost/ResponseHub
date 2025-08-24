package com.devilGhost.ResponseHub.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//@Component
public class ApiKeyAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String apiKeyHeader = request.getHeader("Authorization");
        if(apiKeyHeader==null){
            // we don't have api-key and need it for further processing
            // thus stop the filter chain and return response accordingly
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType(MediaType.APPLICATION_JSON.toString());
            response.getWriter().write("\"error\":\"Access Denied: Missing API-Key.\"");
            return;
        }
        String apiKey=apiKeyHeader.substring(8);// "Bearer "
        try{
            // fetch user details via api-key hash it before search
            UserDetails userDetails = customUserDetailsService.loadUserByApiKey(passwordEncoder.encode(apiKey));
            // set token for auth manager
            UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,null);
            // set token details
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // set it to security context
            SecurityContextHolder.getContext().setAuthentication(authToken);
            filterChain.doFilter(request,response);
        }
        catch(UsernameNotFoundException e){
            // this means that api-key wasn't valid thus return unauthorized access
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON.toString());
            response.getWriter().write("\"\\\"error\\\":\\\"Access Denied: Invalid API-Key.\\\"\"");
            return;//stop the filter chain
        }

    }
}
