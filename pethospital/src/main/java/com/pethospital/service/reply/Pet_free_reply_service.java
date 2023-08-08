package com.pethospital.service.reply;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pethospital.domain.Pet_member;
import com.pethospital.domain.board.Pet_free_board;
import com.pethospital.domain.reply.Pet_free_reply;
import com.pethospital.repository.Pet_member_Repository;
import com.pethospital.repository.board.Pet_free_board_Repository;
import com.pethospital.repository.reply.Pet_free_reply_Repository;

@Service
public class Pet_free_reply_service {

	@Autowired
	Pet_free_reply_Repository petFreeReplyRepository;
	
	@Autowired
	Pet_free_board_Repository petFreeBoardRepository;
	
	@Autowired
	Pet_member_Repository petMemberRepository;
	
	// 전체 댓글 조회
	public List<Pet_free_reply> allReadFreeReply() {
		return petFreeReplyRepository.findAll();
	}
	
	// 댓글 작성
	@Transactional
	public ResponseEntity<String> createReply(int freeBoardId, // 게시판 번호
											  Pet_free_reply reply, // 댓글 내용
											  String userId){ // 유저 아이디
		
		// userId에 해당하는 객체 불러오기
		Pet_member petMember = petMemberRepository.findByUserId(userId);
		// freeBoardId 해당하는 객체 불러오기
		Pet_free_board petFreeBoard = petFreeBoardRepository.findByFreeBoardId(freeBoardId);
		
		// 1-1. 게시글이 존재 할 때..
		if(petFreeBoardRepository.findByFreeBoardId(freeBoardId) != null) {
			// 객체 생성
			Pet_free_reply petFreeReply = new Pet_free_reply();
			
			petFreeReply.setContents(reply.getContents()); // 댓글 내용 저장
			petFreeReply.setNickname(petMember.getNickname()); // userId에 해당하는 닉네임 저장.
			petFreeReply.setUserId(userId); // 유저 아이디 저장
			petFreeReply.setFreeBoardId(petFreeBoard); // 게시글과 댓글의 관계 설정
			petFreeReplyRepository.save(petFreeReply); // 댓글 정보 DB 저장
			
			return ResponseEntity.ok("댓글 작성 성공");							
		}else {//1-2. 게시글이 존재하지 않을 때
			return ResponseEntity.ok("게시글이 존재 하지 않습니다.");
		}
	}
	
	// 댓글 수정
	@Transactional
	public ResponseEntity<String> updateReply(int commentId,
											  Pet_free_reply reply,
											  String userId){
		
		// 1. 댓글 작성 아이디와 수정 시도 아이디와 일치하는 지 확인해야함.
		Pet_free_reply petFreeReply = petFreeReplyRepository.findByCommentId(commentId); 
		
		if(!userId.equals(petFreeReply.getUserId())) {
			return ResponseEntity.ok("본인 댓글 수정이 가능합니다.");
		}else {
			petFreeReply.setContents(reply.getContents()); // 댓글 내용 수정
			petFreeReplyRepository.save(petFreeReply); // 수정된 객체 저장
			return ResponseEntity.ok("수정이 완료되었습니다.");
		}
	}
	
	// 댓글 삭제
	@Transactional
	public ResponseEntity<String> deleteReply(int commentId,
											  Pet_free_reply reply,
											  String userId){
		
		// 댓글 작성 아이디와 삭제 시도 아이디와 일치하는 지 확인
		Pet_free_reply petFreeReply = petFreeReplyRepository.findByCommentId(commentId); 
		
		if(!userId.equals(petFreeReply.getUserId())) {
			return ResponseEntity.ok("본인 댓글만 삭제 가능합니다.");
		}else {
			petFreeReplyRepository.deleteByCommentId(commentId); // 지정한 댓글 삭제
			return ResponseEntity.ok("삭제가 완료되었습니다.");
		}
		
	}
}
