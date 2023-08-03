package com.pethospital.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pethospital.service.Pet_hospital_Service;

@RestController
public class Pet_controller {
    
    @Autowired
    private Pet_hospital_Service pet_hospital_sevice;

    // '광역도시' 목록반환
    //@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/province") 
    public Map<String, Object> getProvinces() {
        Map<String, Object> response = new HashMap<>();
        response.put("province", pet_hospital_sevice.getDistinctProvinces()); // 광역도시 반환
        return response;
    }

    // '광역도시'에 속한 '시/군/구' 반환
    @GetMapping("/province/{province}")
    public Map<String, Object> getProvinces(@PathVariable String province) {
        Map<String, Object> response = new HashMap<>();
        response.put("sigungu", pet_hospital_sevice.getDistinctCitiesByProvince(province)); // 시/구/군 반환
        return response;
    }

    // '광역도시'에 속한 '시/군/구'에 속한 동/읍/면 반환
    @GetMapping("/province/{province}/{sigungu}")
    public Map<String, Object> getProvinces(@PathVariable String province, @PathVariable String sigungu) {
        Map<String, Object> response = new HashMap<>();
        response.put("dong", pet_hospital_sevice.getDistinctDetailCitiesByProvinceAndCity(province, sigungu)); // 동/읍/면 반환
        return response;
    }
      
    // 검색 동물병원 반환 > 검색
    @GetMapping("/searchhospital/{name}")
    public Map<String, Object> getHospitalOfName(@PathVariable String name) {
        Map<String, Object> response = new HashMap<>();
        response.put("hospital_name", pet_hospital_sevice.getpethospitalByName(name)); // 검색을 통한 동물병원 
        return response;
    }

    
     // 상세검색
     // '광역도시'에 속한 동물병원 반환
     @GetMapping("/hospital/{province}")
     public Map<String, Object> getHospitalOfProvinces(@PathVariable String province){
         Map<String, Object> response = new HashMap<>();
         response.put("pethospital", pet_hospital_sevice.getpethospitalByProvince(province)); // 광역도시 병원목록 
         return response;
     }
     
     // '광역도시' 에 속하고 '시군구' 속한 동물병원 반환
     @GetMapping("/hospital/{province}/{city}")
     public Map<String, Object> getHospitalOfCities(@PathVariable String province, 
    		 										@PathVariable String city) {
         Map<String, Object> response = new HashMap<>();
         response.put("pethospital", pet_hospital_sevice.getpethospitalByProvinceAndCity(province, city)); // 도/시 + 시/구/군 병원목록
         return response;
     }
     
     // '광역도시' 에 속한 '시군구'에 속한 '동읍면' 에 속한 동물병원 반환
     @GetMapping("/hospital/{province}/{city}/{detailcity}")
     public Map<String, Object> getHospitalOfDetailCities(@PathVariable String province, 
    		 											  @PathVariable String city, 
    		 											  @PathVariable String detailcity){
         Map<String, Object> response = new HashMap<>();
         response.put("pethospital", pet_hospital_sevice.getpethospitalByProvinceAndCityAndDetailCity(province, city, detailcity));// 도/시 + 시/구/군 + 동/읍/면 병원목록
         return response;
     }
     
     
//   // 각 지역에 맞는 동물병원 반환 > 상세검색
//   @GetMapping("/hospital")
//   public Map<String, Object> getHospitalOfProvinces(String province, String sigungu, String dong){
//       Map<String, Object> response = new HashMap<>();
//       response.put("pethospital", pet_hospital_sevice.getpethospitalByProvinceAndCityAndDetailCity(province, sigungu, dong)); // 도시에 따른 병원목록 
//       return response;
//   }

   // 각 지역에 맞는 동물병원 반환 > 상세검색
//   @GetMapping("/hospital")
//   public Map<String, Object> getHospitalOfProvinces(@RequestParam(required = false) String province, 
//   												  @RequestParam(required = false) String sigungu, 
//   												  @RequestParam(required = false) String dong){
//       Map<String, Object> response = new HashMap<>();
//       response.put("pethospital", pet_hospital_sevice.getpethospitalByProvinceAndCityAndDetailCity(province, sigungu, dong)); // 도시에 따른 병원목록
//       return response;
//   }
     
     
     
     
     
     
     

    // // '광역도시' 에 속한 '시군구' 반환
    // @GetMapping("/sido={province}&gungu")
    // public Map<String, Object> getCities(@PathVariable String province) {
    //     Map<String, Object> response = new HashMap<>();
    //     response.put("gungu", pet_hospital_sevice.getDistinctCitiesByProvince(province)); // 시/구/군
    //     return response;
    // }

 

    // // '광역도시' 에 속한 '시군구'에 속한 '동읍면' 반환
    // @GetMapping("/sido={province}&gungu={city}&dong")
    // public Map<String, Object> getDetailCities(@PathVariable String province, @PathVariable String city) {
    //     Map<String, Object> response = new HashMap<>();
    //     response.put("dong", pet_hospital_sevice.getDistinctDetailCitiesByProvinceAndCity(province, city)); // 동/읍/면
    //     return response;
    // }

    

}
