package com.pethospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.domain.Pet_member;
import com.pethospital.service.Pet_member_Service;

@RestController
public class Pet_member_controller {

    @Autowired
    private Pet_member_Service pet_member_service;

    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@RequestBody Pet_member petMember) {
        pet_member_service.registerPetMember(petMember); // 프론트에서 보낸 member 정보를 서비스로 보낸다.
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입을 축하드립니다.");
    }
}
