package com.devilGhost.ResponseHub.jwt;

import com.devilGhost.ResponseHub.services.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext applicationContext;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // since jwt filter operates even if endpoint is restricted or not we need to manually set check
        // for endpoint and then do set responses accordingly
        String token = jwtService.getTokenFromRequest(request);
        boolean isRestrictedEndpoint = checkEndpointRestrictiveness(request);

        if(token==null){
            if(isRestrictedEndpoint){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{'error':'Missing auth Token'}");
                return; // don't continue filter chain
            }
            // else continue filter chain
            filterChain.doFilter(request,response);
            return;
        }
        // till this point we have token
        if(!jwtService.validateToken(token)){
            // we have invalid token thus delete that shit token first
            response.setHeader("Set-Cookie", "jwt=; HttpOnly; Path=/; Max-Age=0");
            // now if its not restricted endpoint then just let him visit endpoint
            if(!isRestrictedEndpoint){
                filterChain.doFilter(request,response);
                return;
            }
            // else restrict him from accessing endpoint
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON.toString());
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"error\":\"Invalid token. Token has been deleted!\"}");
            return; // stop the filter chain
        }
//        till this point we now have a valid token , now check that token username in database
        String username=jwtService.getUsernameFromToken(token);
        // using try-catch incase username is invalid , CustomUserDetailService will throw Exception
        try{
            // let the below code run even if it wants to access non-restricted resource
            // as it just sets the AuthenticationPrincipal for us
            // if username is invalid then that is handled in catch block
            UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
            // now we set the token for auth manager
            UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,null);
            // token also needs to know the request details
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // set it to security context now i.e. to chain
            SecurityContextHolder.getContext().setAuthentication(authToken);
            filterChain.doFilter(request,response);
        }
        catch (UsernameNotFoundException e){
            // this means token was valid but username is farzi thus delete this token
            response.setHeader("Set-Cookie", "jwt=; HttpOnly; Path=/; Max-Age=0");
            // now if user was trying to access the non restricted resource , let him acess
            if(!isRestrictedEndpoint){
                filterChain.doFilter(request,response);
                return;
            }
            // else restrict him and give error
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{'error':'Invalid Username, token has been deleted!'}");
            return; // stop the filter chain
        }
    }
    private boolean checkEndpointRestrictiveness(HttpServletRequest request){
        String path=request.getRequestURI();
        return path.contains("/api/server/dashboard");
    }
}
