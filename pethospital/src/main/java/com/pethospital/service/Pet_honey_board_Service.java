package com.pethospital.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pethospital.repository.Pet_honey_board_Repository;

@Service
public class Pet_honey_board_Service {

	@Autowired
	Pet_honey_board_Repository pethoneyboardrepository;
	
	
}
