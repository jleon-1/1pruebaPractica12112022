package com.webservice.streaming.model.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webservice.streaming.model.entity.Usuario;


public interface UsuarioDaoRepository extends JpaRepository<Usuario, Integer>{
	
	Optional<Usuario> findByEmailAndContrasenia(String email, String contrasenia);
	
	Optional<Usuario> findByIdUsuario(int idUsuario);
}
