package com.webservice.consulti.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.webservice.consulti.domain.repository.RolesPagosRepository;
import com.webservice.consulti.persistence.dao.RolesPagosDaoRepository;
import com.webservice.consulti.persistence.model.RolesPagos;

@Repository
public class RolesPagosImpl implements RolesPagosRepository{
	
	@Autowired
	private RolesPagosDaoRepository rolesPagosDaoRepository;

	@Override
	public Optional<List<RolesPagos>> obtenerRolesPagos() {
		// TODO Auto-generated method stub
		Optional<List<RolesPagos>> rolesPagos = rolesPagosDaoRepository.obtenerRolesPagos();
		return rolesPagos;
	}

	@Override
	public Optional<RolesPagos> obtenerRolesPagosPorEmpleado(int idEmpleado) {
		// TODO Auto-generated method stub
		Optional<RolesPagos> rolPagos = rolesPagosDaoRepository.obtenerRolesPagosPorEmpleado(idEmpleado);
		return rolPagos;
	}
	
	

}
