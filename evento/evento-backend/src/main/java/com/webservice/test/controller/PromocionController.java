package com.webservice.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webservice.test.model.entity.Promocion;
import com.webservice.test.service.PromocionService;

@RestController
@RequestMapping("promociones")
public class PromocionController {
	
	@Autowired
	private PromocionService promocionService;
	
	@PostMapping("/save")
	public ResponseEntity<Promocion> save(@RequestBody Promocion promocion) {
		return new ResponseEntity<>(promocionService.save(promocion), HttpStatus.CREATED);
	}

}
