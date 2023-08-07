package com.pethospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_honey_reply;
import com.pethospital.repository.Pet_honey_reply_Repository;

@Service
public class Pet_honey_reply_service {

	@Autowired
	Pet_honey_reply_Repository petHoneyReplyRepository;
	
	// 전체 댓글 조회
	public List<Pet_honey_reply> allReadHoneyReply(){
		return petHoneyReplyRepository.findAll();
	}
}
