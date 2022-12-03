package com.webservice.test.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.test.model.dao.EventoDaoRepository;
import com.webservice.test.model.entity.Evento;


@Service
public class EventoService {
	
	@Autowired
	private EventoDaoRepository eventoDaoRepository;
	
	public Evento save(Evento evento) {
		return eventoDaoRepository.save(evento);
	}
}
