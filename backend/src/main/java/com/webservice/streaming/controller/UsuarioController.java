package com.webservice.streaming.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webservice.streaming.model.entity.Usuario;
import com.webservice.streaming.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping("/login")
	public ResponseEntity<Usuario> loginUsuario(@RequestBody Usuario usuario) {
		return usuarioService.loginUsuario(usuario.getEmail(), usuario.getContrasenia())
				.map(login -> new ResponseEntity<>(login, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/sesion/{email}/{contrasenia}")
	public ResponseEntity<Usuario> getUsuarioLogin(@PathVariable("email") String email, @PathVariable("contrasenia") String contrasenia){
		return usuarioService.loginUsuario(email, contrasenia)
				.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/save-user")
	public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
		return new ResponseEntity<>(usuarioService.crearUsuario(usuario), HttpStatus.CREATED);
	}

	@PutMapping("/update-user")
	public ResponseEntity<Usuario> actualizarUsuario(@RequestBody Usuario usuario) {
		Optional<Usuario> optionalUsuario = usuarioService.getUsuarioById(usuario.getIdUsuario());
		if (optionalUsuario.isPresent()) {
			Usuario updateUsuario = optionalUsuario.get();
			updateUsuario.setIdPlan(usuario.getIdPlan());
			return new ResponseEntity<>(usuarioService.crearUsuario(usuario), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
