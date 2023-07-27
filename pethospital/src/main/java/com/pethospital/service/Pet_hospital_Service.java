package com.pethospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pethospital.domain.Pet_hospital;
import com.pethospital.repository.Pet_hospital_Repository;

@Service
public class Pet_hospital_Service {

    @Autowired
    private Pet_hospital_Repository pet_hospital_Repository;

    public List<String> getDistinctProvinces() {
        return pet_hospital_Repository.findDistinctProvince();
    }

    public List<String> getDistinctCitiesByProvince(String province) {
        return pet_hospital_Repository.findDistinctCityByProvince(province);
    }

    public List<String> getDistinctDetailCitiesByProvinceAndCity(String province, String city) {
        return pet_hospital_Repository.findDistinctDetailcityByProvinceAndCity(province, city);
    }

    /// 
    public List<Pet_hospital> getpethospitalByProvinceAndCityAndDetailCity(String province, String city, String detail_city) {
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

    // public List<Pet_hospital> getpethospitalByProvince(String province) {
    //     return pet_hospital_Repository.findByProvince(province);
    // }

    // public List<Pet_hospital> getpethospitalByProvinceAndCity(String province, String city) {
    //     return pet_hospital_Repository.findByProvinceAndCity(province, city);
    // }

}