package com.webservice.streaming.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.streaming.model.dao.PersonaDaoRepository;
import com.webservice.streaming.model.entity.Persona;

@Service
public class PersonaService {
	
	@Autowired
	private PersonaDaoRepository personaDaoRepository;
	
	public List<Persona> obtenerListaPersonas(){
		return personaDaoRepository.findAll();
	}

}
