package com.pethospital.repository.reply;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethospital.domain.reply.Pet_free_reply;

public interface Pet_free_reply_Repository extends JpaRepository<Pet_free_reply, Integer> {
    
	
	// 댓글 번호 객체 저장
	Pet_free_reply findByCommentId(int commentId);
	
	// 댓글 삭제
	void deleteByCommentId(int commentId);
}
