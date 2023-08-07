package com.pethospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_honey_board;
import com.pethospital.domain.Pet_member;
import com.pethospital.repository.Pet_honey_board_Repository;
import com.pethospital.repository.Pet_member_Repository;

import jakarta.transaction.Transactional;

@Service
public class Pet_honey_board_Service {

	@Autowired
	Pet_honey_board_Repository petHoneyBoardRepository;
	
	
	@Autowired
	Pet_member_Repository petMemberRepository;
	
	// 게시글 등록
	public void createHoneyService(Pet_honey_board petHoneyBoard, String userId) {
		// 게시글을 작성할 때 멤버정보(닉네임, 아이디)를 게시판 테이블에 저장한다.
		Pet_member petMember = petMemberRepository.findByUserId(userId);
				
		// 로그인 유저 정보 게시글 ID, NickName 저장
		petHoneyBoard.setUserId(petMember.getUserId());
		petHoneyBoard.setNickname(petMember.getNickname());

		petHoneyBoardRepository.save(petHoneyBoard);
	}
	// 전체 게시글 조회
	public List<Pet_honey_board> allSelectHoneyBoard() {
		return petHoneyBoardRepository.findAll();
	}
		
	// 특정 게시글 조회(제목검색)
	public Pet_honey_board selectHoneyBoard(String title) {
		
		// 1. 게시글이 있는 지 판단한다.
		if(petHoneyBoardRepository.findByTitle(title) != null) {			
			// 1-1 제목 게시글 불러오고
			Pet_honey_board likeHoneyBoard = petHoneyBoardRepository.findByTitle(title);
			// 1-2 게시글 조회수 수정(증가)
			likeHoneyBoard.setViews(likeHoneyBoard.getViews() + 1); 		
			// 1-3 조회수 증가후 다시 저장
			petHoneyBoardRepository.save(likeHoneyBoard);
			
			// 2. 게시글 반환
			return petHoneyBoardRepository.findByTitle(title);
		}else {
			return null;
		}
	}
		
	// 게시글 수정
	public Object updateHoneyBoard(int honeyBoardId, Pet_honey_board post, String userId) {
		Pet_member petMember = petMemberRepository.findByUserId(userId);
		
		if(petMember == null) {
			return "회원이 아닙니다.";
		}else {
			Pet_honey_board modifyHoneyBoard = petHoneyBoardRepository.findByHoneyBoardId(honeyBoardId); // 번호로 게시글 찾고
			
			if(modifyHoneyBoard != null) {
				modifyHoneyBoard.setTitle(post.getTitle());
				modifyHoneyBoard.setContent(post.getContent());
				modifyHoneyBoard.setImagefile(post.getImagefile());
				
				return petHoneyBoardRepository.save(modifyHoneyBoard);
			}else {
				return null;
			}
		}
	}
	
	// 게시글 삭제
	@Transactional
	public ResponseEntity<String> deleteHoneyBoard(int honeyBoardId, String userId) {
		Pet_member petMember = petMemberRepository.findByUserId(userId);
		
		if(petMember == null) {
			return ResponseEntity.ok("회원이 아닙니다.");
		}else {
			if(petHoneyBoardRepository.findByHoneyBoardId(honeyBoardId) != null) {
				petHoneyBoardRepository.deleteByHoneyBoardId(honeyBoardId);
			}
		}
		return ResponseEntity.ok("게시글이 삭제 되었습니다.");
	}
	
}
