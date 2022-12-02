package com.webservice.streaming.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.streaming.model.dao.UsuarioDaoRepository;
import com.webservice.streaming.model.entity.Usuario;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioDaoRepository usuarioDaoRepository;
	
	public Optional<Usuario> getUsuarioById(int idUsuario){
		Optional<Usuario> usuario = usuarioDaoRepository.findById(idUsuario);
		return usuario;
	}
	
	public Optional<Usuario> loginUsuario(String email, String contrasenia){
		Optional<Usuario> loginUsuario = usuarioDaoRepository.findByEmailAndContrasenia(email, contrasenia);
		return loginUsuario;
	}
	
	public Usuario crearUsuario(Usuario usuario) {
		return usuarioDaoRepository.save(usuario);
	}
}
