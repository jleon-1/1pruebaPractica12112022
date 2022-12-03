package com.webservice.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webservice.test.model.entity.Evento;
import com.webservice.test.service.EventoService;

@RestController
@RequestMapping("eventos")
public class EventoController {
	
	@Autowired
	private EventoService eventoService;
	
	@PostMapping("/save")
	public ResponseEntity<Evento> save(@RequestBody Evento evento) {
		return new ResponseEntity<>(eventoService.save(evento), HttpStatus.CREATED);
	}

}
