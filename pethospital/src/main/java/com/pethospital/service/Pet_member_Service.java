package com.pethospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_member;
import com.pethospital.repository.Pet_member_Repository;

@Service
public class Pet_member_Service {

    @Autowired
    private Pet_member_Repository pet_member_repository;

    public void registerPetMember(Pet_member petMember){
        pet_member_repository.save(petMember); // Pet_member에 회원정보 저장.
    }
}
