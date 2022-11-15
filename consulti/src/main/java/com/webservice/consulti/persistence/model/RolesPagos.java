package com.webservice.consulti.persistence.model;

import java.text.DecimalFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class RolesPagos {

	@Id
	@Column(name = "id_rol_pago")
	private Integer idRolPago;
	
	@Column(name = "id_empleado")
	private Integer idEmpleado;
	
	private String nombres;
	private String apellidos;
	private String cedula;
	private DecimalFormat neto_pagar;
	private String estado;
	public Integer getIdRolPago() {
		return idRolPago;
	}
	public void setIdRolPago(Integer idRolPago) {
		this.idRolPago = idRolPago;
	}
	public Integer getIdEmpleado() {
		return idEmpleado;
	}
	public void setIdEmpleado(Integer idEmpleado) {
		this.idEmpleado = idEmpleado;
	}
	public String getNombres() {
		return nombres;
	}
	public void setNombres(String nombres) {
		this.nombres = nombres;
	}
	public String getApellidos() {
		return apellidos;
	}
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	public String getCedula() {
		return cedula;
	}
	public void setCedula(String cedula) {
		this.cedula = cedula;
	}
	public DecimalFormat getNeto_pagar() {
		return neto_pagar;
	}
	public void setNeto_pagar(DecimalFormat neto_pagar) {
		this.neto_pagar = neto_pagar;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public RolesPagos(Integer idRolPago, Integer idEmpleado, String nombres, String apellidos, String cedula,
			DecimalFormat neto_pagar, String estado) {
		super();
		this.idRolPago = idRolPago;
		this.idEmpleado = idEmpleado;
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.cedula = cedula;
		this.neto_pagar = neto_pagar;
		this.estado = estado;
	}
	public RolesPagos() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "RolesPagos [idRolPago=" + idRolPago + ", idEmpleado=" + idEmpleado + ", nombres=" + nombres
				+ ", apellidos=" + apellidos + ", cedula=" + cedula + ", neto_pagar=" + neto_pagar + ", estado="
				+ estado + "]";
	}
	
}
