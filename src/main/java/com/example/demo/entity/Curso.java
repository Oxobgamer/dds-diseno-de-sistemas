package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Table(name = "cursos")
public class Curso {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	Long id;
	@Column(name = "nombre")
	String nombre;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_tema")
	Tema tema;
	@Column(name = "fecha_inicio")
	Date fechaInicio;
	@Column(name = "id_docente")
	Long idDocente;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Tema getTema() {
		return tema;
	}

	public void setTema(Tema tema) {
		this.tema = tema;
	}

	public Date getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(Date fecha_inicio) {
		this.fechaInicio = fecha_inicio;
	}

	public Long getIdDocente() {
		return idDocente;
	}

	public void setIdDocente(Long id_docente) {
		this.idDocente = id_docente;
	}
}
