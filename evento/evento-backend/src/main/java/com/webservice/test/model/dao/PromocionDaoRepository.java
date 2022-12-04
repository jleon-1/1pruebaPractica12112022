package com.webservice.test.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webservice.test.model.entity.Promocion;

public interface PromocionDaoRepository extends JpaRepository<Promocion, Integer> {

}
