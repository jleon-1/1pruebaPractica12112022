package com.webservice.consulti.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.consulti.domain.repository.RolesPagosRepository;
import com.webservice.consulti.persistence.model.RolesPagos;

@Service
public class RolesPagosService {

	@Autowired
	private RolesPagosRepository rolesPagosRepository;
	
	public Optional<List<RolesPagos>> obtenerRolesPagos(){
		return rolesPagosRepository.obtenerRolesPagos();
	}
	
	public Optional<RolesPagos> obtenerRolesPagosPorEmpleado(int idEmpleado){
		return rolesPagosRepository.obtenerRolesPagosPorEmpleado(idEmpleado);
	}
}
