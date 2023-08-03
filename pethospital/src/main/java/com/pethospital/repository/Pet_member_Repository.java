package com.pethospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethospital.domain.Pet_member;

public interface Pet_member_Repository extends JpaRepository<Pet_member, Integer> {
    // 프론트에서 전송한 회원가입 정보를 Pet_member 저장.
	
	Pet_member findByUserId(String userId);
}
