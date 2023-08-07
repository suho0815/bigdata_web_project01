package com.pethospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.domain.Pet_honey_reply;
import com.pethospital.service.Pet_honey_reply_service;

@RestController 
public class Pet_honey_reply_controller {

	@Autowired
	Pet_honey_reply_service petHoneyReplyService;
	
	
	// 전체 댓글 조회 - 비회원, 회원
	@GetMapping("/honeyReply")
	public List<Pet_honey_reply> allHoneyReply() {
		return petHoneyReplyService.allReadHoneyReply();
	}
	
	// 댓글 작성 - 회원
	@PostMapping("/honeyReply")
	public ResponseEntity<String> createHoneyReply() {
		return null;
	}
	
	
	// 댓글 수정 - 회원
	@PutMapping("/honeyReply/{commentId}")
	public ResponseEntity<String> updateHoneyReply(@PathVariable int commentId) {
		return null;
	}
	
	
	// 댓글 삭제 - 회원
	@DeleteMapping
	public ResponseEntity<String> deleteHoneyReply() {
		return null;
	}
	
	
	
	
}
