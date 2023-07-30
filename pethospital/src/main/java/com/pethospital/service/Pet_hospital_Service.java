package com.pethospital.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_hospital;
import com.pethospital.repository.Pet_hospital_Repository;

@Service
public class Pet_hospital_Service {

    private static final Logger logger = LoggerFactory.getLogger(Pet_hospital_Service.class);

    @Autowired
    private Pet_hospital_Repository pet_hospital_Repository;

    // 광역시도
    public List<String> getDistinctProvinces() {
        return pet_hospital_Repository.findDistinctProvince();
    }

    // 시군구
    public List<String> getDistinctCitiesByProvince(String province) {
        return pet_hospital_Repository.findDistinctCityByProvince(province);
    }

    // 읍면동
    public List<String> getDistinctDetailCitiesByProvinceAndCity(String province, String city) {
        return pet_hospital_Repository.findDistinctDetailcityByProvinceAndCity(province, city);
    }
 
    // 상세검색
    public List<Pet_hospital> getpethospitalByProvinceAndCityAndDetailCity(String province, String city, String detail_city) {
        logger.info("Parameters: province={}, city={}, detail_city={}", province, city, detail_city);
        
        if (province == null){
            return pet_hospital_Repository.findAll();
        }else {
            if (city == null){
                return pet_hospital_Repository.findByProvince(province);
            }else{
                if(detail_city == null) {
                    return pet_hospital_Repository.findByProvinceAndCity(province, city);
                }
                return pet_hospital_Repository.findByProvinceAndCityAndDetailcity(province, city, detail_city);
            }
        }
    }

    // 검색
    public List<Pet_hospital> getpethospitalByName(String name) {
        if (name == null) {
            return null;
        }else {
            return pet_hospital_Repository.findByHospitalName(name);
        }
    }

    // public List<Pet_hospital> getpethospitalByProvince(String province) {
    //     return pet_hospital_Repository.findByProvince(province);
    // }

    // public List<Pet_hospital> getpethospitalByProvinceAndCity(String province, String city) {
    //     return pet_hospital_Repository.findByProvinceAndCity(province, city);
    // }

}