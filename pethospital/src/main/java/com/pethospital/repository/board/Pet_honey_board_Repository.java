package com.pethospital.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethospital.domain.board.Pet_honey_board;

public interface Pet_honey_board_Repository extends JpaRepository<Pet_honey_board, Integer>{
    
	// 게시글등록 
	// -> save
		
	// 전체 게시글 조회 
	// -> findAll

	// 특정 게시글 조회
	Pet_honey_board findByTitle(String title);
		
	// 게시글 수정
	// -> save
	
	// 게시글 삭제
	void deleteByHoneyBoardId(int honeyBoardId);
	
    // 게시글 번호로 게시글 찾기(수정, 삭제, 좋아요)
    Pet_honey_board findByHoneyBoardId(int honeyBoardId); 

}
