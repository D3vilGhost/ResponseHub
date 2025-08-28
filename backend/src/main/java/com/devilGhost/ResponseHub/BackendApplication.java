package com.devilGhost.ResponseHub;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}


	// this is not related to security, thus not declared this bean in securityyConfig
	// instead declared it here
	@Bean
	public ObjectMapper objectMapper(){
        return new ObjectMapper();
	}
}
