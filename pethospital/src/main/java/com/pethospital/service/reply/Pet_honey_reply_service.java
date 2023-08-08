package com.pethospital.service.reply;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pethospital.domain.Pet_member;
import com.pethospital.domain.board.Pet_honey_board;
import com.pethospital.domain.reply.Pet_free_reply;
import com.pethospital.domain.reply.Pet_honey_reply;
import com.pethospital.repository.Pet_member_Repository;
import com.pethospital.repository.board.Pet_honey_board_Repository;
import com.pethospital.repository.reply.Pet_honey_reply_Repository;

@Service
public class Pet_honey_reply_service {

	@Autowired
	Pet_honey_reply_Repository petHoneyReplyRepository;
	
	@Autowired
	Pet_honey_board_Repository petHoneyBoardRepository;
	
	@Autowired
	Pet_member_Repository petMemberRepository;
	
	// 전체 댓글 조회
	public List<Pet_honey_reply> allReadHoneyReply(){
		return petHoneyReplyRepository.findAll();
	}
	
	// 댓글 작성
	@Transactional
	public ResponseEntity<String> createReply(int honeyBoardId, // 게시판 번호
											  Pet_honey_reply reply, // 댓글 내용
											  String userId){ // 유저 아이디
			
		// userId에 해당하는 객체 불러오기
		Pet_member petMember = petMemberRepository.findByUserId(userId);
		// freeBoardId 해당하는 객체 불러오기
		Pet_honey_board petHoneyBoard = petHoneyBoardRepository.findByHoneyBoardId(honeyBoardId);
			
		// 1-1. 게시글이 존재 할 때..
		if(petHoneyBoard != null) {
			// 객체 생성
			Pet_honey_reply petHoneyReply = new Pet_honey_reply();
			
			petHoneyReply.setContents(reply.getContents()); // 댓글 내용 저장
			petHoneyReply.setNickname(petMember.getNickname()); // userId에 해당하는 닉네임 저장.
			petHoneyReply.setUserId(userId); // 유저 아이디 저장
			petHoneyReply.setHoneyBoardId(petHoneyBoard); // 게시글과 댓글의 관계 설정
			petHoneyReplyRepository.save(petHoneyReply); // 댓글 정보 DB 저장
			
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
		Pet_honey_reply petHoneyReply = petHoneyReplyRepository.findByCommentId(commentId); 
		
		if(!userId.equals(petHoneyReply.getUserId())) {
			return ResponseEntity.ok("본인 댓글 수정이 가능합니다.");
		}else {
			petHoneyReply.setContents(reply.getContents()); // 댓글 내용 수정
			petHoneyReplyRepository.save(petHoneyReply); // 수정된 객체 저장
			return ResponseEntity.ok("수정이 완료되었습니다.");
		}
	}
		
	// 댓글 삭제
	@Transactional
	public ResponseEntity<String> deleteReply(int commentId,
											  Pet_free_reply reply,
											  String userId){
			
		// 댓글 작성 아이디와 삭제 시도 아이디와 일치하는 지 확인
		Pet_honey_reply petHoneyReply = petHoneyReplyRepository.findByCommentId(commentId); 
			
		if(!userId.equals(petHoneyReply.getUserId())) {
			return ResponseEntity.ok("본인 댓글만 삭제 가능합니다.");
		}else {
			petHoneyReplyRepository.deleteByCommentId(commentId); // 지정한 댓글 삭제
			return ResponseEntity.ok("삭제가 완료되었습니다.");
		}
			
	}
}
