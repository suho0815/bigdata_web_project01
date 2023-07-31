package com.pethospital.config.auth;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.pethospital.domain.Pet_member;
import com.pethospital.repository.Pet_member_Repository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
	
	private Pet_member_Repository petMemberRepository;
	
	public JWTAuthorizationFilter(AuthenticationManager authenticationManager, Pet_member_Repository petMemberRepository) {
		super(authenticationManager);
		this.petMemberRepository = petMemberRepository;
	}
	
	// JWT 토큰을 사용해서 사용자 인증과 권한 부여하는 필터
	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse resp, FilterChain chain) throws IOException, ServletException {
		
		// 1. Request Header에서 "Authorization" 헤드를 가져온다.
		String srcToken = req.getHeader("Authorization");
		
		// 2. 헤더에 "Bearer" 접두사가 없거나 토큰이 null인 경우, 다음 필터로 전달
		if(srcToken == null || !srcToken.startsWith("Bearer ")) {
			chain.doFilter(req, resp);
			return;
		}
		
		// 3. 헤더에서 "Bearer" 접두사제거후 JWT 토큰 추출.
		String jwtToken = srcToken.replace("Bearer ", "");
		
		// 4. JWT 토큰을 검증하고, 해당 토큰에 포함된 "username" 클레임(정보)를 가져온다.
		// (여기서는 edu.pnu.jwtkey를 사용하여 토큰을 검증한다.)
		String userId = JWT.require(Algorithm.HMAC256("edu.pnu.jwtkey")).build()
																		.verify(jwtToken)
																		.getClaim("userId")
																		.asString();
		
		// 5. 추출한 "username" 정보를 사용하여 사용자를 데이터베이스에서 조회합니다.
		Pet_member opt = petMemberRepository.findByUserId(userId);
		
		// 6. 조회된 사용자가 없는 경우, 다음 필터로 전달한다.  >> Optional : 컨테이너가 비어있을 경우때문에 사용.
		if(opt == null) { // 존재하지 않는 아이디를 넣어서 디버깅을 해보자 >> 어떻게 넘어오냐? 
			chain.doFilter(req, resp);
			return;
		}
		
		// 7. 조회된 사용자 정보를 사용하여 Spring Security의 User 객체를 생성합니다.
		//Pet_member findmember = opt.get();
		

		// 8. 생성된 User 객체로 Authentication 객체를 생성
		User user = new User(opt.getUserId(), opt.getPassword(), opt.getAuthorities());
		
		// 아이디, 비밀번호, 권한 들고와서 User 저장.
		Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
		
		// 9. 생성된 Authentication 객체를 SecurityContextHolder에 저장하여 사용자를 인증.
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		// 10. 다음 필터 전환
		chain.doFilter(req, resp);
	}
}
