package com.webservice.test.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.test.model.dao.UsuarioDaoRepository;
import com.webservice.test.model.entity.Usuario;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioDaoRepository usuarioDaoRepository;
	
	public Optional<Usuario> getUsuarioLogin(String usuario, String contrasenia){
		return usuarioDaoRepository.findByUsuarioAndContrasenia(usuario, contrasenia);
	}

}
