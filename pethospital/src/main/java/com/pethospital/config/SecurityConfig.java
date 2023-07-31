package com.pethospital.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.pethospital.config.auth.JWTAuthorizationFilter;
import com.pethospital.config.filter.JWTAuthenticationFilter;
import com.pethospital.repository.Pet_member_Repository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private Pet_member_Repository petMemberRepository;
	
	@Autowired
	private AuthenticationConfiguration authConfig;
	
	@Bean // 리턴값을 IOC컨테이너에 올린다. 즉 외부 클래스에서 사용이 가능하다.
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf->csrf.disable()); // CSRF 보호 비활성화 (JS에서 호출 가능)
		http.cors(cors->cors.disable()); // CORS 보호 비활성화 (React에서 호출 가능):RestAPI로 호출할 때

		// member, manager, admin 접근 권한 설정
		http.authorizeHttpRequests(security->{
	        security.anyRequest().permitAll(); // 어떠한 요청도 다 받아준다.
		});
		
		http.formLogin(frmLogin->frmLogin.disable()); 
		// Form을 이용한 로그인을 사용하지 않겠다는 설정 즉 .html파일을 작성하지 않아도 된다		
		http.sessionManagement(ssmg->ssmg.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // STATELESS : 지속하지 않는다.
		// 시큐리티 세션을 만들지 않겠다고 설정
		// 그럼 어떻게?
		// 로그인 정보를 넘겨주면 세션을 만들어 jwt 토큰을 생성해서 반환한다. 이후에 삭제한다. 
		// 결론적으로 : 로그인(요청)할 때마다 세션을 생성하고 처리가 끝나면 세션을 지운다.
		// 요청 > 세션생성 > 반응 > 세션삭제 > 토큰반환
		
		// 시큐리티 세션을 만들지 않았기 때문에 필터를 쓰는 건가???
		//// 필터 1
		// http.addFilter(new JWTAuthenticationFilter()); 
		//// 필터 2
		http.addFilter(new JWTAuthenticationFilter(authConfig.getAuthenticationManager()));
		http.addFilter(new JWTAuthorizationFilter(authConfig.getAuthenticationManager(), petMemberRepository));
		return http.build();
	}
}
