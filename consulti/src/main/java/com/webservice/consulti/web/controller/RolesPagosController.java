package com.webservice.consulti.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.webservice.consulti.domain.service.RolesPagosService;
import com.webservice.consulti.persistence.model.RolesPagos;

@RestController
@RequestMapping("/roles-pagos")
public class RolesPagosController {

	@Autowired
	private RolesPagosService rolesPagosService;

	@GetMapping("/listado")
	public ResponseEntity<List<RolesPagos>> obtenerRolesPagos() {
		return rolesPagosService.obtenerRolesPagos().map(rol_pago -> new ResponseEntity<>(rol_pago, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@GetMapping("/por-empleado/:id_empleado")
	public ResponseEntity<RolesPagos> obtenerRolesPagosPorEmpleado(@RequestParam("id_empleado") int idEmpleado) {
		return rolesPagosService.obtenerRolesPagosPorEmpleado(idEmpleado)
				.map(rol_pago -> new ResponseEntity<>(rol_pago, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
