package com.pethospital.domain;

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


@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
@Entity
public class Pet_hospital{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String phone_number;
    private String street_address;
    
    @Column(name="hospital_name")
    private String hospitalName;
    
    private long longitude;
    private long latitude;
    private String province;   // 도/시
    private String city;       // 시/군/구
    private String detailcity;// 읍/면/동
}