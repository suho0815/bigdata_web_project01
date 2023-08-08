package com.pethospital.domain.reply;

import java.sql.Timestamp;

import com.pethospital.domain.board.Pet_honey_board;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private int commentId;
    
    @ManyToOne
    @JoinColumn(name="honey_board_id", nullable = false)
    private Pet_honey_board honeyBoardId;

    @Column(name="user_id", unique = true)
    private String userId;
    private String nickname;
    
    @Column(nullable = false)
    private String contents;
    
    @Column(name="registration_date")
    private Timestamp registrationDate;
}
