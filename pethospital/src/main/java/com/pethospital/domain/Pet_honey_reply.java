package com.pethospital.domain;

import java.security.Timestamp;

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

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pet_honey_reply {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private Long commentId;
    
    @Column(name="honey_board_id", nullable = false)
    private int honeyBoardId;

    @Column(name="user_id", nullable = false, unique = true)
    private String userId;
    
    @Column(nullable = false)
    private String nickname;
    
    @Column(nullable = false)
    private String contents;
    
    @Column(name="registration_date")
    private Timestamp registrationDate;
}
