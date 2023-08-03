package com.pethospital.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	
//	@Autowired
//	private SecurityUserDetailsService securityUserDetailsService;	
	// 제이슨에서 PassWord를 못가져오기 때문에 해당 서비스클래스에서 PassWord를 가져와야 한다. 
	
	@Bean // 리턴값을 IOC컨테이너에 올린다. 즉 외부 클래스에서 사용이 가능하다.
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf->csrf.disable()); // CSRF 보호 비활성화 (JS에서 호출 가능)
		http.cors(cors->cors.disable()); // CORS 보호 비활성화 (React에서 호출 가능):RestAPI로 호출할 때

		// 모두, member, admin 접근 권한 설정
		http.authorizeHttpRequests(security->{
	        		//.requestMatchers("/api/**").permitAll()  	// 비회원 접근 가능
	        		//.requestMatchers("/api/login").permitAll()		// 비회원 접근 가능
			security.requestMatchers("/board/**").hasRole("MEMBER") // 회원만 접근 가능
	        		.anyRequest().permitAll();
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
		
		//JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter(authConfig.getAuthenticationManager(), securityUserDetailsService);
		
		//// 필터 2
		http.addFilter(new JWTAuthenticationFilter(authConfig.getAuthenticationManager()));
		http.addFilter(new JWTAuthorizationFilter(authConfig.getAuthenticationManager(), petMemberRepository));
		return http.build();
	}
}
