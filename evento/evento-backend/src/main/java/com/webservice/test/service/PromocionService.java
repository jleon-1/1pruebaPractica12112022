package com.webservice.test.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.test.model.dao.PromocionDaoRepository;
import com.webservice.test.model.entity.Promocion;

@Service
public class PromocionService {
	
	@Autowired
	private PromocionDaoRepository promocionDaoRepository;
	
	public Promocion save(Promocion promocion) {
		return promocionDaoRepository.save(promocion);
	}

}
