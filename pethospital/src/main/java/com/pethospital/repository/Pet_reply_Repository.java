package com.pethospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethospital.domain.Pet_reply;

public interface Pet_reply_Repository extends JpaRepository<Pet_reply, Long> {
    
}
