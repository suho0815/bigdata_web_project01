package com.pethospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_member;
import com.pethospital.dto.Pet_member_dto;
import com.pethospital.repository.Pet_member_Repository;

@Service
public class Pet_member_Service {

    @Autowired
    private Pet_member_Repository pet_member_repository;
    
    @Autowired
	BCryptPasswordEncoder secret;
    
        
    // 회원 정보 저장
    public void registerPetMember(Pet_member_dto petMemberDto) {
    	Pet_member petMember = new Pet_member();
    	
    	// 필수사항
    	petMember.setName(petMemberDto.getName());
    	petMember.setUserId(petMemberDto.getUserId());
    	petMember.setPassword(secret.encode(petMemberDto.getPassword())); // 암호화하기
    	petMember.setNickname(petMemberDto.getNickname());
    	petMember.setEmail(petMemberDto.getEmail());
    	
     	// 선택사항
    	petMember.setMobilePhone(petMemberDto.getMobilePhone());
    	petMember.setAddress(petMemberDto.getAddress()); 
    	
    	// 권한부여
    	petMember.setRole("ROLE_MEMBER");
    	
      	pet_member_repository.save(petMember);
    }
    
    // jwt를 이용하기 때문에 service에서 구현할 필요 없다.
    
//    // 회원 정보 확인(로그인)
//    public int loginPetMember(String userId, String password) {
//    	// 아이디, 비밀번호 확인하는 코드 작성란
//    	Pet_member petMemberUserId = pet_member_repository.findByUserId(userId);
//    	//Pet_member petMemberPassword = pet_member_repository.findByPassword(password);
//    	    		
//    	if(petMemberUserId != null) { // 회원
//    		if(petMemberUserId.getPassword().equals(password)) return 1; // 로그인 성공
//    		else return -1; // 비밀번호 틀림
//    	}else return 0;
//    }
}
