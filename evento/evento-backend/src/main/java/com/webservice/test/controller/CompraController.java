package com.webservice.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webservice.test.model.entity.Compra;
import com.webservice.test.service.CompraService;

@RestController
@RequestMapping("compras")
public class CompraController {
	
	@Autowired
	private CompraService compraService;
	
	@PostMapping("/save")
	public ResponseEntity<Compra> save(@RequestBody Compra compra) {
		return new ResponseEntity<>(compraService.save(compra), HttpStatus.CREATED);
	}

}
