package com.pethospital.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.service.Pet_board_like_Service;

@RestController
public class Pet_board_like_controller {
	
	@Autowired
	Pet_board_like_Service petBoardLikeService;
	
	@PostMapping("/like")
	public ResponseEntity<String> boardLike(Authentication authentication, String boardName, int boardId) {
		// 1. 권한이 있는 가? >> authentication
		// 2. 어떤 게시판인가? >> boardName
		// 3. 몇번 게시글인가? >> boardId
		
		String userId = authentication.getName();
		
		return petBoardLikeService.boardLikeOnOff(userId, boardName, boardId);
	}

}
