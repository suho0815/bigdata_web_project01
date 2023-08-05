package com.pethospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethospital.domain.Pet_honey_board;

public interface Pet_honey_board_Repository extends JpaRepository<Pet_honey_board, Integer>{
    
    // 게시글 번호로 게시글 찾기(수정, 삭제, 좋아요)
    Pet_honey_board findByHoneyBoardId(int honeyBoardId); 

}
