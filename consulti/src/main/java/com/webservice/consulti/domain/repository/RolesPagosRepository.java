package com.webservice.consulti.domain.repository;

import java.util.List;
import java.util.Optional;

import com.webservice.consulti.persistence.model.RolesPagos;

public interface RolesPagosRepository {
	
	Optional<List<RolesPagos>> obtenerRolesPagos();
	Optional<RolesPagos> obtenerRolesPagosPorEmpleado(int idEmpleado);

}
