package com.webservice.consulti.persistence.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.webservice.consulti.persistence.model.RolesPagos;


public interface RolesPagosDaoRepository extends JpaRepository< RolesPagos, Integer>{

	@Query(value="select rp.id_rol_pago, emp.id_empleado, emp.nombres, emp.apellidos, emp.cedula, rp.neto_pagar, rp.estado \r\n"
			+ "from empleados emp, roles_pagos rp \r\n"
			+ "where emp.id_empleado = rp.id_empleado \r\n"
			+ "and rp.estado = 'A'", nativeQuery=true)
	Optional<List<RolesPagos>> obtenerRolesPagos();
	
	@Query(value="select rp.id_rol_pago, emp.id_empleado, emp.nombres, emp.apellidos, emp.cedula, rp.neto_pagar, rp.estado \r\n"
			+ "from empleados emp, roles_pagos rp \r\n"
			+ "where emp.id_empleado = rp.id_empleado \r\n"
			+ "and emp.id_empleado= :idEmpleado\r\n"
			+ "and rp.estado = 'A'", nativeQuery=true)
	Optional<RolesPagos> obtenerRolesPagosPorEmpleado( int idEmpleado);
	
	
}
