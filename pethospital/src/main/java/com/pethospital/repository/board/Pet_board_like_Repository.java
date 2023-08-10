package com.pethospital.repository.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pethospital.domain.Pet_member;
import com.pethospital.domain.board.Pet_board_like;
import com.pethospital.domain.board.Pet_free_board;
import com.pethospital.domain.board.Pet_honey_board;

public interface Pet_board_like_Repository extends JpaRepository<Pet_board_like, Integer>{

    // 해당 유저가 해당 게시글에 좋아요를 누른 레이블이 존재하는 가??? 를 판단하기 위함.
    Pet_board_like findByPetMemberAndPetFreeBoard(Pet_member petMember, Pet_free_board petFreeBoard);
    Pet_board_like findByPetMemberAndPetHoneyBoard(Pet_member petMember, Pet_honey_board petHoneyBoard);

    // 좋아요가 이미 있을 때
    void deleteByPetMemberAndPetFreeBoard(Pet_member petMember, Pet_free_board petFreeBoard);
    void deleteByPetMemberAndPetHoneyBoard(Pet_member petMember, Pet_honey_board petHoneyBoard);

    // 좋아요가 없을 때
    // ~~~.save()

    // 좋아요 상위 5개 불러오기
    @Query("SELECT * FROM Pet_free_board JOIN Pet_honey_board ON Pet_free_board.likes = Pet_honey_board.likes ORDER BY Pet_free_board.likes DESC LIMIT 5")
    Object findJoinTable();
}
