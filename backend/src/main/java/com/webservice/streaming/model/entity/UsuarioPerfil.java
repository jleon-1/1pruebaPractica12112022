package com.webservice.streaming.model.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuarios_perfiles")
public class UsuarioPerfil {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuario_perfil")
	private Integer idUsuarioPerfil;
	
	@Column(name = "id_usuario")
	private Integer idUsuario;
	
	@Column(name = "id_perfil")
	private Integer idPerfil;
	
	private String estado = "A";
	
	@Column(name = "usuario_creacion")
	private String usuarioCreacion;
	
	@Column(name = "usuario_modificacion")
	private String usuarioModificacion;
	
	@Column(name = "fecha_creacion", insertable = false, updatable = false)
	private Date fechaCreacion;
	
	@Column(name = "fecha_modificacion", insertable = false, updatable = false)
	private Date fechaModificacion;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario", insertable = false, updatable = false)
	private Usuario usuario;
	
	@ManyToOne
	@JoinColumn(name = "id_perfil", insertable = false, updatable = false)
	private Perfil perfil;

	public Integer getIdUsuarioPerfil() {
		return idUsuarioPerfil;
	}

	public void setIdUsuarioPerfil(Integer idUsuarioPerfil) {
		this.idUsuarioPerfil = idUsuarioPerfil;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Integer getIdPerfil() {
		return idPerfil;
	}

	public void setIdPerfil(Integer idPerfil) {
		this.idPerfil = idPerfil;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getUsuarioCreacion() {
		return usuarioCreacion;
	}

	public void setUsuarioCreacion(String usuarioCreacion) {
		this.usuarioCreacion = usuarioCreacion;
	}

	public String getUsuarioModificacion() {
		return usuarioModificacion;
	}

	public void setUsuarioModificacion(String usuarioModificacion) {
		this.usuarioModificacion = usuarioModificacion;
	}

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaModificacion() {
		return fechaModificacion;
	}

	public void setFechaModificacion(Date fechaModificacion) {
		this.fechaModificacion = fechaModificacion;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

}
