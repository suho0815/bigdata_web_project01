package com.pethospital.controller.reply;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.domain.reply.Pet_free_reply;
import com.pethospital.service.reply.Pet_free_reply_service;

@RestController
public class Pet_free_reply_controller {

	
	@Autowired
	Pet_free_reply_service petFreeReplyService;
	
	// 전체 댓글 조회 - 회원권한
	@GetMapping("/freeReply")
	public List<Pet_free_reply> allFreeReply() {
		return petFreeReplyService.allReadFreeReply();
	}
	
	// 댓글 작성 - 회원
	@Transactional
	@PostMapping("/freeReply/{freeBoardId}")
	public ResponseEntity<String> createFreeReply(@PathVariable int freeBoardId, 
												  @RequestBody Pet_free_reply reply,
												  Authentication authentication) {
		// 1. 몇번 게시글인가?
		String userId = authentication.getName();	
		return petFreeReplyService.createReply(freeBoardId, reply, userId);
	}
		
	// 댓글 수정 - 회원
	@Transactional
	@PutMapping("/freeReply/{commentId}")
	public ResponseEntity<String> updateFreeReply(@PathVariable int commentId,
												  @RequestBody Pet_free_reply reply,
												  Authentication authentication) {
		// 1. 회원이 맞는가? Authentication
		// 2. 몇번 댓글인가? commentId
		// 3. 본인이 쓴 댓글이 맞는가? >> Service에서 구현
		String userId = authentication.getName();
		return petFreeReplyService.updateReply(commentId, reply, userId);
	}
	
	
	// 댓글 삭제 - 회원
	@Transactional
	@DeleteMapping("/freeReply/{commentId}")
	public ResponseEntity<String> deleteFreeReply(@PathVariable int commentId,
			  									  @RequestBody Pet_free_reply reply,
			  									  Authentication authentication) {
		// 1. 회원이 맞는가? authentication
		// 2. 몇번 댓글인가? commentId
		// 3. 본인이 쓴 댓글이 맞는가?
		String userId = authentication.getName();
		return petFreeReplyService.deleteReply(commentId, reply, userId);
	}	
}
