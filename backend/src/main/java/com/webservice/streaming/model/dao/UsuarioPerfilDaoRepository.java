package com.webservice.streaming.model.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webservice.streaming.model.entity.UsuarioPerfil;

public interface UsuarioPerfilDaoRepository extends JpaRepository<UsuarioPerfil, Integer> {
	
	Optional<UsuarioPerfil> findByIdUsuario(int idUsuario);
	
	Optional<UsuarioPerfil> findByIdUsuarioPerfil(int idUsuarioPerfil);

}
