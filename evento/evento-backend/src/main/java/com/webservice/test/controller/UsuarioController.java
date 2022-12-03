package com.webservice.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webservice.test.model.entity.Usuario;
import com.webservice.test.service.UsuarioService;


@RestController
@RequestMapping("usuarios")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping("/login")
	public ResponseEntity<Usuario> getUsuarioLogin(@RequestBody Usuario usuario){
		return usuarioService.getUsuarioLogin(usuario.getUsuario(), usuario.getContrasenia())
				.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/login/{usuario}/{contrasenia}")
	public ResponseEntity<Usuario> getUsuarioLogin(@PathVariable("usuario") String usuario, @PathVariable("contrasenia") String contrasenia){
		return usuarioService.getUsuarioLogin(usuario, contrasenia)
				.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

}
