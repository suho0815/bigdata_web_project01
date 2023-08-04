package com.pethospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_board_like;
import com.pethospital.repository.Pet_board_like_Repository;

@Service
public class Pet_board_like_Service {

	@Autowired
	Pet_board_like_Repository petBoardLikeRepository;
	
	public ResponseEntity<String> boardLikeOnOff(String userId, String boardName, int boardId){
		
		Pet_board_like petBoardLike;
		
		//petBoardLike.set
		
		//👎👎👎
		return ResponseEntity.ok("♥♥♥♥♥");
	}
}
