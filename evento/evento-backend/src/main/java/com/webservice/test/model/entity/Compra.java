package com.webservice.test.model.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "compras")
public class Compra {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_compra")
	private Integer idCompra;
	
	@Column(name = "id_persona")
	private Integer idPersona;
	
	@Column(name = "id_evento")
	private Integer idEvento;
	
	@Column(name = "fecha_compra")
	private Date fechaCompra;
	
	@Column(name = "numero_entradas")
	private Integer numeroEntradas;
	
	private Double pagar;
	
	@Column(name = "numero_compras")
	private Integer numeroCompras;
	
	private String estado = "A";

	public Integer getIdCompra() {
		return idCompra;
	}

	public void setIdCompra(Integer idCompra) {
		this.idCompra = idCompra;
	}

	public Integer getIdPersona() {
		return idPersona;
	}

	public void setIdPersona(Integer idPersona) {
		this.idPersona = idPersona;
	}

	public Integer getIdEvento() {
		return idEvento;
	}

	public void setIdEvento(Integer idEvento) {
		this.idEvento = idEvento;
	}

	public Date getFechaCompra() {
		return fechaCompra;
	}

	public void setFechaCompra(Date fechaCompra) {
		this.fechaCompra = fechaCompra;
	}

	public Integer getNumeroEntradas() {
		return numeroEntradas;
	}

	public void setNumeroEntradas(Integer numeroEntradas) {
		this.numeroEntradas = numeroEntradas;
	}

	public Double getPagar() {
		return pagar;
	}

	public void setPagar(Double pagar) {
		this.pagar = pagar;
	}

	public Integer getNumeroCompras() {
		return numeroCompras;
	}

	public void setNumeroCompras(Integer numeroCompras) {
		this.numeroCompras = numeroCompras;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

}
