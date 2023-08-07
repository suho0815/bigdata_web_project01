package com.pethospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.domain.Pet_honey_board;
import com.pethospital.service.Pet_honey_board_Service;

import jakarta.transaction.Transactional;

@RestController
public class Pet_honey_board_controller{
	
	@Autowired
	Pet_honey_board_Service petHoneyBoardService;
	
	// 꿀팁 게시판
	// 게시글 등록하기
	@PostMapping("/honey")
	public ResponseEntity<String> createBoard(Pet_honey_board petHoneyBoard, Authentication authentication){	
		if (authentication == null) {
			return ResponseEntity.ok("회원이 아닙니다.");
		}else {
			// 권한이 있어야 게시글 작성가능
			String userId = authentication.getName();
			petHoneyBoardService.createHoneyService(petHoneyBoard, userId);
			return ResponseEntity.ok("글이 등록 되었습니다.");
		}
	}
	
	// 전체 게시글 가져오기
	@GetMapping("/honey")
	public List<Pet_honey_board> allReadBoard(){
		return petHoneyBoardService.allSelectHoneyBoard();
	}
	
	// 특정 게시글 가져오기(제목검색)
	@GetMapping("/honey/{title}")
	public Pet_honey_board readBoard(@PathVariable String title){
		return petHoneyBoardService.selectHoneyBoard(title);
	}
	
	// 게시글 수정하기
	@PutMapping("honey/{honeyBoardId}")
	public Object updateBoard(@PathVariable int honeyBoardId, Pet_honey_board post, Authentication authentication) {
		String userId = authentication.getName();
		return petHoneyBoardService.updateHoneyBoard(honeyBoardId, post, userId);
	}
	
	// 게시글 삭제하기
	@Transactional
	@DeleteMapping("honey/{honeyBoardId}")
	public ResponseEntity<String> deleteBoard(@PathVariable int honeyBoardId, Authentication authentication) {
		String userId = authentication.getName();
		
		return petHoneyBoardService.deleteHoneyBoard(honeyBoardId, userId);
		
	}
		
}