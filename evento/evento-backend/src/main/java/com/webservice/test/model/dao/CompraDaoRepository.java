package com.webservice.test.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webservice.test.model.entity.Compra;

public interface CompraDaoRepository extends JpaRepository<Compra, Integer> {

}
