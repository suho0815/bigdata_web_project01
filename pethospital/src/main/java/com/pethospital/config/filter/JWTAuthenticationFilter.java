package com.pethospital.config.filter;

import java.io.IOException;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pethospital.domain.Pet_member;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j // : 디버그, 오류, 정보 등에 관한 메시지를 설정할 수 있다. 특정 오류에 대한 해답을 오류 메시지로 기록할 수 있다.(잘 쓰면 정말 유용)
@RequiredArgsConstructor // : 클래스 내에 모든 필드에 대한 생성자를 자동으로 생성해준다.
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
		
	private final AuthenticationManager authenticationManager;
	// 위 생성자는 자동생성이다. 클래스에 @RequiredArgsConstructor 주석이 대신 만들어준다.
	
	@Override // 로그인을 시도하는 메소드
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse resp) throws AuthenticationException {
		ObjectMapper om = new ObjectMapper(); // JSON 데이터를 역질렬화 즉 데이터구조를 바꿔준다.
		try {
			Pet_member petMember = om.readValue(req.getInputStream(), Pet_member.class); 
			// req.getInputStream() : JSON형태를 읽는다.
			// Pet_member.class : 읽은 데이터를 Pet_member개체로 역직렬화한다.(역직렬화 : JSON데이터의 구조를 변환시킨다. 왜? 그래야 자바에서 알아먹는다.)
			Authentication authToken = new UsernamePasswordAuthenticationToken(petMember.getUserId(), petMember.getPassword()); 
			// get으로 username과 password를 저장한 사용자 인증 토큰 생성(변수이름은 마음대로)
			Authentication auth = authenticationManager.authenticate(authToken);
			// 위에서 만들어진 토큰이 유효한가?
			log.info("attemptAuthentication :[" + petMember.getUserId() + "]"); 
			// 무슨 목적을 가진 코드인가? >> 
			return auth;
		} catch (Exception e) {
			log.info("Not Authenticated : " + e.getMessage());
		}
		return null;
	}
	
	@Override // 로그인에 성공하면 이쪽으로 온다. 
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse resp, FilterChain chain, Authentication authResult) throws IOException, ServletException {
		
		User user = (User)authResult.getPrincipal();
		log.info("successfulAuthentication:" + user.toString());
		
		// JWT 생성
		String jwtToken = JWT.create()
							.withClaim("username", user.getUsername()) // 토큰에 저장되는 정보(선택사항)
							.withExpiresAt(new Date(System.currentTimeMillis()+1000*60*10)) // 토큰 유지시간
							.sign(Algorithm.HMAC256("edu.pnu.jwtkey")); // 암호화
		// 응답 Header에 "Authorization"이라는 키를 추가해서 JWT를 설정
		// Bearer : JWT토큰임을 나타내는 용어; Basic : "Basic "+Base64(username:password)
		resp.addHeader("Authorization", "Bearer " + jwtToken);
		chain.doFilter(req, resp);
	}
}
