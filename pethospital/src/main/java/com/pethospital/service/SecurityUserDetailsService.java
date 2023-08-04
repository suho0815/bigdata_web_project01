package com.pethospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_member;
import com.pethospital.repository.Pet_member_Repository;

@Service
public class SecurityUserDetailsService implements UserDetailsService {

	@Autowired
	private Pet_member_Repository petMemberRepository; // JPA상속받은 클래스를 통해 요청한 데이터를 DB에서 불러올 수 있다. 
	
	
	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		Pet_member petMember = petMemberRepository.findByUserId(userId);
//				.orElseThrow(() -> 
//				new UsernameNotFoundException("Not Found!"));
		// username이 존재하지 않으면 "NOT Found" 를 리턴한다. (아이디가 없을 경우)
		// .orElseThrow를 쓰지 않고 조건문으로 직접 로직을 구현해도 된다. 
		// 대신 member는 객체(Object)기 때문에 객체로 저장해야한다. 
		
		//System.out.println(petMember.getPassword());   // 확인용
		//System.out.println(petMember.getAuthorities());// 확인용
		
		return new User(petMember.getUserId(), 
						petMember.getPassword(), 
						petMember.getAuthorities());
	}

}
