package com.pethospital.controller.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.service.board.Pet_board_like_Service;

@RestController
public class Pet_board_like_controller {
	
	@Autowired
	Pet_board_like_Service petBoardLikeService;
	
	@Transactional
	@PostMapping("/like")
	public ResponseEntity<String> boardLike(
											@RequestParam String boardName, 
											@RequestParam String boardIdStr,
											Authentication authentication) 
	{
		// 좋아요 버튼을 누르면 아래와 같은 데이터가 백으로 온다...
		// 1. 권한이 있는 가? >> authentication And 누가 눌렀는 가?(userId)
		// 2. 어떤 게시판인가? >> boardName >> 프론트에서 free or honey를 보내준다. 
		// 3. 몇번 게시글인가? >> boardId
		
		int boardId = Integer.parseInt(boardIdStr);

		String userId = authentication.getName(); // 권한에서 userId 추출
		
		return petBoardLikeService.boardLikeOnOff(userId, boardName, boardId);
	}

	// 좋아요 상위 5개 게시글 
	@GetMapping("/top5like")
	public Object topLike() {
		return petBoardLikeService.fiveLike();
	}
}
