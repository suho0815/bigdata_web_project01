package com.pethospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pethospital.domain.Pet_hospital;

public interface Pet_hospital_Repository extends JpaRepository<Pet_hospital, Long>{
    @Query("SELECT DISTINCT p.province FROM Pet_hospital p")
    List<String> findDistinctProvince();

    @Query("SELECT DISTINCT p.city FROM Pet_hospital p WHERE p.province = ?1")
    List<String> findDistinctCityByProvince(String province);

    @Query("SELECT DISTINCT p.detailcity FROM Pet_hospital p WHERE p.province = ?1 AND p.city = ?2")
    List<String> findDistinctDetailcityByProvinceAndCity(String province, String city);

 // JPA자동으로 쿼리 생성.. >> 해당 병원 정보를 전부 반환.(정보가 여러개)
    // 상세검색
    List<Pet_hospital> findByProvince(String province);
    List<Pet_hospital> findByProvinceAndCity(String province, String city);
    List<Pet_hospital> findByProvinceAndCityAndDetailcity(String province, String city, String detailcity);
    
    // 병원검색
    List<Pet_hospital> findByHospitalName(String hospital_name); 
}