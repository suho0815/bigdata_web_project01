package com.pethospital.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.service.Pet_hospital_Service;

@ComponentScan
@RestController
public class Pet_controller {
    
    @Autowired
    private Pet_hospital_Service pet_hospital_sevice;

    // '도/시' 목록과 해당 '도/시'에 위치한 병원 목록을 반환
    @GetMapping("/provinces")
    public Map<String, Object> getProvinces(@RequestParam String province) {
        Map<String, Object> response = new HashMap<>();
        response.put("provinces", pet_hospital_sevice.getDistinctProvinces()); // 도/시 
        response.put("pethospital", pet_hospital_sevice.getpethospitalByProvince(province)); // 도/시 병원목록 
        return response;
    }

    // 특정 '도/시'에 속한 '구/군' 목록과 해당 '도/시'와 '시/구/군'에 위치한 병원 목록을 반환
    @GetMapping("/cities")
    public Map<String, Object> getCities(@RequestParam String province, @RequestParam String city) {
        Map<String, Object> response = new HashMap<>();
        response.put("cities", pet_hospital_sevice.getDistinctCitiesByProvince(province)); // 시/구/군
        response.put("pethospital", pet_hospital_sevice.getpethospitalByProvinceAndCity(province, city));
        return response;
    }

    // 특정 '도/시'와 '구/군'에 속한 '동/읍/면' 목록과 해당 '도/시', '시/구/군', '동/읍/면'에 위치한 병원 목록을 반환
    @GetMapping("/detail_cities")
    public Map<String, Object> getDetailCities(@RequestParam String province, @RequestParam String city, @RequestParam String detail_city) {
        Map<String, Object> response = new HashMap<>();
        response.put("detail_cities", pet_hospital_sevice.getDistinctDetailCitiesByProvinceAndCity(province, city)); // 동/읍/면
        response.put("pethospital", pet_hospital_sevice.getpethospitalByProvinceAndCityAndDetailCity(province, city, detail_city));
        return response;
    }

}
