package com.pethospital.repository.reply;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethospital.domain.reply.Pet_honey_reply;

public interface Pet_honey_reply_Repository extends JpaRepository<Pet_honey_reply, Integer> {
    
	// 댓글 번호 객체 저장
	Pet_honey_reply findByCommentId(int commentId);
	
	// 댓글 삭제
	void deleteByCommentId(int commentId);
}
