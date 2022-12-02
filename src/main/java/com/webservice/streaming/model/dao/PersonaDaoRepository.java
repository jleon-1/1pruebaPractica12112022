package com.webservice.streaming.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webservice.streaming.model.entity.Persona;

public interface PersonaDaoRepository extends JpaRepository<Persona, Integer>{

}
