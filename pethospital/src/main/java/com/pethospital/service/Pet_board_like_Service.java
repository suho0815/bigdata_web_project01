package com.pethospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_board_like;
import com.pethospital.domain.Pet_free_board;
import com.pethospital.domain.Pet_honey_board;
import com.pethospital.domain.Pet_member;
import com.pethospital.repository.Pet_board_like_Repository;
import com.pethospital.repository.Pet_free_board_Repository;
import com.pethospital.repository.Pet_honey_board_Repository;
import com.pethospital.repository.Pet_member_Repository;

@Service
public class Pet_board_like_Service {

	@Autowired
	Pet_board_like_Repository petBoardLikeRepository; // 좋아요 테이블
	
	@Autowired
	Pet_member_Repository petMemberRepository; // 멤버

	@Autowired
	Pet_free_board_Repository petFreeBoardRepository; // 자유(자랑)게시판

	@Autowired
	Pet_honey_board_Repository petHoneyBoardRepository; // 꿀팁게시판

	public ResponseEntity<String> boardLikeOnOff(String userId, String boardName, int boardId){
		
		Pet_member petMember = petMemberRepository.findByUserId(userId);
		
		if (boardName.equals("free")) {
			Pet_free_board petFreeBoard = petFreeBoardRepository.findByFreeBoardId(boardId);
			if(petBoardLikeRepository.findByPetMemberAndPetFreeBoard(petMember, petFreeBoard) != null) {
				// 좋아요가 있으면 Off(레이블 삭제)
				petBoardLikeRepository.deleteByPetMemberAndPetFreeBoard(petMember, petFreeBoard);
				return ResponseEntity.ok("Free Board like Off"); // 좋아요가 있으면 -1
			}else{
				// 좋아요가 없으면 On(레이블 생성)
				Pet_board_like petBoardLike = Pet_board_like.builder()
											.petMember(petMember)
											.petFreeBoard(petFreeBoard)
											.petHoneyBoard(null)
											.build();
				petBoardLikeRepository.save(petBoardLike);
				return ResponseEntity.ok("Free Board like On"); // 좋아요가 없으면 +1
			}
		}else if(boardName.equals("honey")) {
			Pet_honey_board petHoneyBoard = petHoneyBoardRepository.findByHoneyBoardId(boardId);
			if(petBoardLikeRepository.findByPetMemberAndPetHoneyBoard(petMember, petHoneyBoard) != null) {
				// 좋아요가 있으면 Off(레이블 삭제)
				petBoardLikeRepository.deleteByPetMemberAndPetHoneyBoard(petMember, petHoneyBoard);
				return ResponseEntity.ok("Honey Board like Off");
			}else {
				// 좋아요가 없으면 On(레이블 생성성)
				Pet_board_like petBoardLike = Pet_board_like.builder()
											.petMember(petMember)
											.petFreeBoard(null)
											.petHoneyBoard(petHoneyBoard)
											.build();
				petBoardLikeRepository.save(petBoardLike);
				return ResponseEntity.ok("Honey Board like On");
			}
		}
		return null;
	}
}
