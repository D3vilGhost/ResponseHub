package com.devilGhost.ResponseHub.jwt;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

//@Slf4j
@Service
public class JwtService {
    @Autowired
    private JwtConfig jwtConfig;

    public HttpHeaders generateTokenAndCookieHeader(String username) {
        Map<String,Object> claims=Map.of("username",username);
        // create token
        String token = Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtConfig.getExpirationTime()))
                .signWith(jwtConfig.getSigningKey())
                .compact();

        // create cookie
        ResponseCookie cookie=ResponseCookie
                .from("jwt",token)
                .httpOnly(true)         // cannot be accessed by JS
                .secure(false)          // true for HTTPS only
                .path("/")              // cookie valid for entire site
                .maxAge( 24 * 60 * 60 )           // 24 hour
                .sameSite("Strict")     // CSRF protection
                .build();
        // set cookie in header
        HttpHeaders httpHeader=new HttpHeaders();
        httpHeader.add(HttpHeaders.SET_COOKIE,cookie.toString());
        return httpHeader;
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

    // below method validates a token
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(jwtConfig.getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            // basically if we were able to parse token till validate of signing key
            // it means token is valid
            return true;
        } catch (Exception e) {
//            log.info(e.getMessage());
            return false;
        }
    }

    public String getUsernameFromToken(String token){
        return Jwts.parser()
                .verifyWith(jwtConfig.getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

}
