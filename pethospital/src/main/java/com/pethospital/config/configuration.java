package com.pethospital.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class configuration implements WebMvcConfigurer {
	
   @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // "/api" 접두사 아래의 모든 경로에 대해 CORS를 구성한다.
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}


