package com.pethospital.domain.board;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pet_honey_board {
    
	// 필수
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="honey_board_id")
    private int honeyBoardId;

    @Column(name="user_id")
    private String userId;
    private String nickname; 	// 게시글 닉네임
    
    @Column(nullable = false)
    private String title; 		// 게시글 제목
    
    @Column(nullable = false)
    private String content; 	// 게시글 내용
    
    // 선택
    private String imagefile; 	// 이미지파일 (여러개)
    
    private LocalDateTime  regdate;
    private LocalDateTime  updatedate;
    private LocalDateTime  deletedate;
    private int views; 			// 조회수
    private int likes;			// 좋아요
}
