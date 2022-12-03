package com.webservice.test.model.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webservice.test.model.entity.Usuario;

public interface UsuarioDaoRepository extends JpaRepository<Usuario, Integer>{
	
	Optional<Usuario> findByUsuarioAndContrasenia(String usuario, String contrasenia);

}
