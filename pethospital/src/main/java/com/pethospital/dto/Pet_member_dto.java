package com.pethospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet_member_dto {
	
	private String name;
	private String userId;
	private String password;
	private String nickname;
	private String email;
	private String mobilePhone;
	private String address;
//	private String role;
}
