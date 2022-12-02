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

import com.webservice.streaming.model.entity.UsuarioPerfil;
import com.webservice.streaming.service.UsuarioPerfilService;

@RestController
@RequestMapping("/usuarios-perfiles")
public class UsuarioPerfilController {

	@Autowired
	private UsuarioPerfilService usuarioPerfilService;

	@GetMapping("/list-by-user/{idUsuario}")
	public ResponseEntity<UsuarioPerfil> obtenerPerfilesUsuario(@PathVariable("idUsuario") int idUsuario) {
		return usuarioPerfilService.obtenerPerfilesUsuario(idUsuario)
				.map(usuarioPerfil -> new ResponseEntity<>(usuarioPerfil, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PostMapping("/save-usuario-perfil")
	public ResponseEntity<UsuarioPerfil> saveUsuarioPerfil(@RequestBody UsuarioPerfil usuarioPerfil) {
		return new ResponseEntity<>(usuarioPerfilService.saveUsuarioPerfil(usuarioPerfil), HttpStatus.CREATED);
	}

	@PutMapping("/delete-usuario-perfil/{idUsuarioPerfil}")
	public ResponseEntity<UsuarioPerfil> deleteUsuarioPerfil(@PathVariable("idUsuarioPerfil") int idUsuarioPerfil) {
		Optional<UsuarioPerfil> optionalUsuarioPerfil = usuarioPerfilService.obtenerPerfilUsuarioById(idUsuarioPerfil);
		if (optionalUsuarioPerfil.isPresent()) {
			UsuarioPerfil updateUsuarioPerfil = optionalUsuarioPerfil.get();
			updateUsuarioPerfil.setEstado("I");
			return new ResponseEntity<>(usuarioPerfilService.saveUsuarioPerfil(updateUsuarioPerfil), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
