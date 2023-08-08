package com.pethospital.controller.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pethospital.domain.board.Pet_free_board;
import com.pethospital.service.board.Pet_free_board_Service;

import jakarta.transaction.Transactional;

@RestController
public class Pet_free_board_controller{
	
	@Autowired
	Pet_free_board_Service petFreeBoardService;
	
	// 자유 게시판 - 회원
	// 게시글 등록 
	@PostMapping("/free")
	public ResponseEntity<String> createFree(@ModelAttribute  Pet_free_board petFreeBoard,
											 @RequestParam("imageFile") MultipartFile imageFile,
											 Authentication authentication){
		
		if (authentication == null) {
	        return ResponseEntity.ok("회원이 아닙니다");
	    } else {
	    	// 멤버권한을 가진자만 게시글을 작성할 수 있다.
			String userId = authentication.getName();
			petFreeBoardService.createFreeService(petFreeBoard, imageFile,userId);
			return ResponseEntity.ok("글이 등록 되었습니다.");
	    }
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
	@PutMapping("free/{freeBoardId}")
	public Object updateFree(@PathVariable int freeBoardId, 
							 @RequestBody Pet_free_board post, 
							 Authentication authentication) {
		
		String userId = authentication.getName();
		
		return petFreeBoardService.updateFreeBoard(freeBoardId, post, userId);
	}
	
	// 게시글 삭제
	@Transactional
	@DeleteMapping("free/{freeBoardId}")
	public ResponseEntity<String> deleteFree(@PathVariable int freeBoardId, Authentication authentication) {
		String userId = authentication.getName();	
		return petFreeBoardService.deleteFreeBoard(freeBoardId, userId);
	}
			
}