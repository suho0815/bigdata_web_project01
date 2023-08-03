package com.pethospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethospital.domain.Pet_free_board;

public interface Pet_free_board_Repository extends JpaRepository<Pet_free_board, Integer>{
 
	// 게시글등록 
	// -> save
	
	// 전체 게시글 조회 
	// -> findAll

	// 특정 게시글 조회
	Pet_free_board findByTitle(String title);
	
	// 게시글 수정
	// -> save
	
	// 게시글 삭제
	void deleteByFreeBoardId(int freeBoardId);
	
	// 게시글 번호로 게시글 찾기(수정, 삭제 공통)
	Pet_free_board findByFreeBoardId(int freeBoardId);
	
}
