package com.devilGhost.ResponseHub.jwt;

import com.devilGhost.ResponseHub.repository.UserModelRepository;
import com.devilGhost.ResponseHub.services.CustomUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token= jwtService.getTokenFromRequest(request);
        // if token is null return and stop auth
        if(token==null){
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("No Token is there");
            return; // stop filter chain
        }
        // if token is not null then validate the token
        if(!jwtService.validateToken(token)){
            response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE);
            response.getWriter().write("Invalid token!");
        }
        String username=jwtService.getUsernameFromToken(token);
        request.setAttribute();
        
    }
}
