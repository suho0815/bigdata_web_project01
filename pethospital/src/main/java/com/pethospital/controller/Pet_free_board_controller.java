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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.domain.Pet_free_board;
import com.pethospital.service.Pet_free_board_Service;

@RestController
public class Pet_free_board_controller{
	
	@Autowired
	Pet_free_board_Service petFreeBoardService;
	
	// 자유 게시판
	// 게시글 등록
	@PostMapping("/free")
	public ResponseEntity<String> createFree(@RequestBody Pet_free_board petFreeBoard, Authentication authentication){
		// 멤버권한을 가진자만 게시글을 작성할 수 있다.
		String userId = authentication.getName();

		petFreeBoardService.createFreeService(petFreeBoard, userId);
		return ResponseEntity.ok("글이 등록 되었습니다.");
	}
	
	// 전체 게시글 조회
	@GetMapping("/free")
	public List<Pet_free_board> allReadFree(){
		return petFreeBoardService.allSelectFreeBoard();
	}
	
	// 특정 게시글 조회(제목검색)
	@GetMapping("/free/{title}")
	public Pet_free_board readFree(@PathVariable String title){
		return petFreeBoardService.selectFreeBoard(title);
	}
	
	// 게시글 수정
	@PutMapping("free/{freeboardId}")
	public Pet_free_board updateFree(@PathVariable int freeBoardId, @RequestBody Pet_free_board post) {
		return petFreeBoardService.updateFreeBoard(freeBoardId, post);
	}
	
	// 게시글 삭제
	@DeleteMapping("free/{freeboardId}")
	public ResponseEntity<String> deleteFree(@PathVariable int freeBoardId) {
		petFreeBoardService.deleteFreeBoard(freeBoardId);
		return ResponseEntity.ok("게시글이 삭제 되었습니다.");
	}
		
	
}