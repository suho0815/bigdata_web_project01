package com.pethospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_free_board;
import com.pethospital.domain.Pet_member;
import com.pethospital.repository.Pet_free_board_Repository;
import com.pethospital.repository.Pet_member_Repository;

import jakarta.transaction.Transactional;

@Service
public class Pet_free_board_Service {

	@Autowired
	Pet_free_board_Repository petFreeBoardRepository;

	@Autowired
	Pet_member_Repository petMemberRepository;
	
	// 게시글 등록
	public void createFreeService(Pet_free_board petFreeBoard, String userId) {
		// 게시글을 작성할 때 멤버정보(닉네임, 아이디)를 게시판 테이블에 저장한다.
		Pet_member petMember = petMemberRepository.findByUserId(userId);
		
		// 로그인 유저 정보 게시글 ID, NickName 저장
		petFreeBoard.setUserId(petMember.getUserId());
		petFreeBoard.setNickname(petMember.getNickname());

		petFreeBoardRepository.save(petFreeBoard);
	}
	
	// 전체 게시글 조회
	public List<Pet_free_board> allSelectFreeBoard() {
		return petFreeBoardRepository.findAll();
	}
	
	// 특정 게시글 조회(제목검색)
	public Pet_free_board selectFreeBoard(String title) {
		
		// 1. 게시글이 있는 지 판단한다.
		if(petFreeBoardRepository.findByTitle(title) != null) {			
			// 1-1 제목 게시글 불러오고
			Pet_free_board likeFreeBoard = petFreeBoardRepository.findByTitle(title);
			// 1-2 게시글 조회수 수정(증가)
			likeFreeBoard.setViews(likeFreeBoard.getViews() + 1); 		
			// 1-3 조회수 증가후 다시 저장
			petFreeBoardRepository.save(likeFreeBoard);
			
			// 2. 게시글 반환
			return petFreeBoardRepository.findByTitle(title);
		}else {
			return null;
		}
	}
		
	// 게시글 수정
	public Object updateFreeBoard(int freeBoardId, Pet_free_board post, String userId) {
		Pet_member petMember = petMemberRepository.findByUserId(userId);

		
		if(petMember == null) {
			return "회원이 아닙니다.";
		}else {
			Pet_free_board modifyFreeBoard = petFreeBoardRepository.findByFreeBoardId(freeBoardId); // 번호로 게시글 찾고
			
			if(modifyFreeBoard != null) {
				modifyFreeBoard.setTitle(post.getTitle());
				modifyFreeBoard.setContent(post.getContent());
				modifyFreeBoard.setImagefile(post.getImagefile());
				
				return petFreeBoardRepository.save(modifyFreeBoard);
			}else {
				return null;
			}
		}
	}
	
	// 게시글 삭제
	@Transactional
	public ResponseEntity<String> deleteFreeBoard(int freeBoardId, String userId) {
		Pet_member petMember = petMemberRepository.findByUserId(userId);

		if(petMember == null) {
			return ResponseEntity.ok("회원이 아닙니다.");
		}else {
			if(petFreeBoardRepository.findByFreeBoardId(freeBoardId) != null) {
				petFreeBoardRepository.deleteByFreeBoardId(freeBoardId);
			}
		}
		return ResponseEntity.ok("게시글이 삭제 되었습니다.");
	}
}
