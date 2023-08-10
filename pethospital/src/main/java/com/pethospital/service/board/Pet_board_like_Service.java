package com.pethospital.service.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pethospital.domain.Pet_member;
import com.pethospital.domain.board.Pet_board_like;
import com.pethospital.domain.board.Pet_free_board;
import com.pethospital.domain.board.Pet_honey_board;
import com.pethospital.repository.Pet_member_Repository;
import com.pethospital.repository.board.Pet_board_like_Repository;
import com.pethospital.repository.board.Pet_free_board_Repository;
import com.pethospital.repository.board.Pet_honey_board_Repository;

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

	@Transactional
	public ResponseEntity<String> boardLikeOnOff(String userId, String boardName, int boardId) {
		
		Pet_member petMember = petMemberRepository.findByUserId(userId);
		
		if (boardName.equals("free")) {
			Pet_free_board petFreeBoard = petFreeBoardRepository.findByFreeBoardId(boardId);
			if(petBoardLikeRepository.findByPetMemberAndPetFreeBoard(petMember, petFreeBoard) != null) {
				// 좋아요가 있으면 Off(레이블 삭제)
				petBoardLikeRepository.deleteByPetMemberAndPetFreeBoard(petMember, petFreeBoard);
				// 자유(자랑) 게시판 좋아요 - 1
				petFreeBoard.setLikes(petFreeBoard.getLikes() - 1);
				petFreeBoardRepository.save(petFreeBoard);
				return ResponseEntity.ok("Free Board like Off"); // 좋아요가 있으면 끈다.
			}else{
				// 좋아요가 없으면 On(레이블 생성)
				Pet_board_like petBoardLike = Pet_board_like.builder()
											.petMember(petMember)
											.petFreeBoard(petFreeBoard)
											.petHoneyBoard(null)
											.build();
				petBoardLikeRepository.save(petBoardLike);
				// 자유(자랑) 게시판 좋아요 + 1
				petFreeBoard.setLikes(petFreeBoard.getLikes() + 1);
				petFreeBoardRepository.save(petFreeBoard);
				return ResponseEntity.ok("Free Board like On"); // 좋아요가 없으면 +1
			}
		}else if(boardName.equals("honey")) {
			Pet_honey_board petHoneyBoard = petHoneyBoardRepository.findByHoneyBoardId(boardId);
			if(petBoardLikeRepository.findByPetMemberAndPetHoneyBoard(petMember, petHoneyBoard) != null) {
				// 좋아요가 있으면 Off(레이블 삭제)
				petBoardLikeRepository.deleteByPetMemberAndPetHoneyBoard(petMember, petHoneyBoard);
				
				// 꿀팁 게시판 좋아요 - 1
				petHoneyBoard.setLikes(petHoneyBoard.getLikes() - 1);
				petHoneyBoardRepository.save(petHoneyBoard);
				
				return ResponseEntity.ok("Honey Board like Off");
			}else {
				// 좋아요가 없으면 On(레이블 생성성)
				Pet_board_like petBoardLike = Pet_board_like.builder()
											.petMember(petMember)
											.petFreeBoard(null)
											.petHoneyBoard(petHoneyBoard)
											.build();
				petBoardLikeRepository.save(petBoardLike);
				
				// 꿀팁 게시판 좋아요 + 1
				petHoneyBoard.setLikes(petHoneyBoard.getLikes() + 1); 
				petHoneyBoardRepository.save(petHoneyBoard);
				
				return ResponseEntity.ok("Honey Board like On");
			}
		}
		return null;
	}

	// 좋아요 상위 5개 게시글
	public Object fiveLike() {
		return petBoardLikeRepository.findJoinTable();
	}
}
