package com.webservice.streaming.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webservice.streaming.model.dao.UsuarioPerfilDaoRepository;
import com.webservice.streaming.model.entity.UsuarioPerfil;

@Service
public class UsuarioPerfilService {
	
	@Autowired
	private UsuarioPerfilDaoRepository usuarioPerfilDaoRepository;
	
	public Optional<UsuarioPerfil> obtenerPerfilesUsuario(int idUsuario){
		Optional<UsuarioPerfil> perfilesUsuario = usuarioPerfilDaoRepository.findByIdUsuario(idUsuario);
		return perfilesUsuario;
	}
	
	public Optional<UsuarioPerfil> obtenerPerfilUsuarioById(int idUsuarioPerfil){
		Optional<UsuarioPerfil> perfilusuario = usuarioPerfilDaoRepository.findByIdUsuarioPerfil(idUsuarioPerfil);
		return perfilusuario;
	}
	
	public UsuarioPerfil saveUsuarioPerfil(UsuarioPerfil usuarioPerfil) {
		return usuarioPerfilDaoRepository.save(usuarioPerfil);
	}
}
