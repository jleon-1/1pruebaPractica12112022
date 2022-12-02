package com.webservice.streaming.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webservice.streaming.model.entity.Persona;
import com.webservice.streaming.service.PersonaService;

@RestController
@RequestMapping("/personas")
public class PersonaController {

	@Autowired
	private PersonaService personaService;

	@GetMapping("/listado")
	public ResponseEntity<List<Persona>> obtenerListaPersonas() {
		return new ResponseEntity<>(personaService.obtenerListaPersonas(), HttpStatus.OK);
	}

}
