//package com.pethospital.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.pethospital.domain.Pet_honey_board;
//import com.pethospital.service.Pet_honey_board_Service;
//
//@RestController
//public class Pet_honey_board_controller{
//	
//	@Autowired
//	Pet_honey_board_Service pethoneyboardservice;
//	
//	// 꿀팁 게시판
//	// 게시글 등록하기
//	@PostMapping("/honey")
//	public ResponseEntity<String> createBoard(Pet_honey_board petBoard){	
//		return ResponseEntity.ok("글이 등록 되었습니다.");
//	}
//	
//	// 전체 게시글 가져오기
//	@GetMapping("/honey")
//	public List<Pet_honey_board> allReadBoard(){
//		return null;
//	}
//	
//	// 특정 게시글 가져오기(제목검색)
//	@GetMapping("/honey/{title}")
//	public Pet_honey_board readBoard(@PathVariable String title){
//		return null;
//	}
//	
//	// 게시글 수정하기
//	@PutMapping("honey/{post}")
//	public ResponseEntity<String> updateBoard(@PathVariable Pet_honey_board boardId) {
//		return ResponseEntity.ok("게시글이 수정 되었습니다.");
//	}
//	
//	// 게시글 삭제하기
//	@DeleteMapping("honey/{honeyboardId}")
//	public ResponseEntity<String> deleteBoard(@PathVariable String boardId) {
//		return ResponseEntity.ok("게시글이 삭제 되었습니다.");
//	}
//	
//	
//	// 자유 게시판
//	// 게시글 등록하기
//	@PostMapping("/free")
//	public ResponseEntity<String> createfree(Pet_honey_board petBoard){	
//		return ResponseEntity.ok("글이 등록 되었습니다.");
//	}
//	
//	// 전체 게시글 가져오기
//	@GetMapping("/free")
//	public List<Pet_honey_board> allReadfree(){
//		return null;
//	}
//	
//	// 특정 게시글 가져오기(제목검색)
//	@GetMapping("/free/{title}")
//	public Pet_honey_board readfree(@PathVariable String title){
//		return null;
//	}
//	
//	// 게시글 수정하기
//	@PutMapping("free/{post}")
//	public ResponseEntity<String> updatefree(@PathVariable Pet_honey_board boardId) {
//		return ResponseEntity.ok("게시글이 수정 되었습니다.");
//	}
//	
//	// 게시글 삭제하기
//	@DeleteMapping("free/{freeboardId}")
//	public ResponseEntity<String> deletefree(@PathVariable String boardId) {
//		return ResponseEntity.ok("게시글이 삭제 되었습니다.");
//	}
//		
//	
//}