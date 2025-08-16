package com.devilGhost.ResponseHub.jwt;

import com.devilGhost.ResponseHub.models.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Autowired
    private JwtConfig jwtConfig;

    // below method builds the token
    public String generateToken(UserModel userModel) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", userModel.getUsername());
        // till now we have basically created a json to store
        // {username: <username>} and is stored in object named claims
        // now we will create our token and return it
        return Jwts.builder()
                .claims(claims)
                .subject(userModel.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtConfig.getExpirationTime()))
                .signWith(jwtConfig.getSigningKey())
                .compact();
    }

    // below method validates a token
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(jwtConfig.getSigningKey())
                    .build()
                    .parseSignedClaims(jwtConfig.getSecretKey())
                    .getPayload();
            // basically if we were able to parse token till validate of signing key
            // it means token is valid
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        // parse the token and then return content
        Claims claims = Jwts.parser()
                .verifyWith(jwtConfig.getSigningKey())
                .build()
                .parseSignedClaims(jwtConfig.getSecretKey())
                .getPayload();
        return claims.getSubject();
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        // to get the token from cookies received from client side
        String token = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt")) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        // token will be null if not present on client's side
        return token;
    }
}
