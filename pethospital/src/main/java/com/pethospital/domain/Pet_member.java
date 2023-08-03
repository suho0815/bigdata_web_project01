package com.pethospital.domain;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
public class Pet_member {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false) // 필수
    private String name;
    
    @Column(nullable = false, unique = true) // 필수 , 중복 x
    private String nickname;
    
    @Column(name = "user_id", nullable = false, unique = true) // 필수, 중복 x
    private String userId;		// 아이디
    
    //@JsonIgnore // 데이터 넘어올 때 패스워드가리기
    @Column(nullable = false)
    private String password;	// 비밀번호
    
    @Column(nullable = false)
    private String email;		// 이메일
    
    @Column(name = "mobile_phone")
    private String mobilePhone;	// 휴대폰 번호
    
    private String address;		// 주소
    
    private String role;		// 권한
    
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return AuthorityUtils.createAuthorityList(role);
    }
    
}
