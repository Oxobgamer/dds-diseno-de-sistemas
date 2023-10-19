package com.example.demo.entity;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;

@Entity
@Table(name = "material")
public class Material {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	Long id;
	@Column(name = "titulo")
	String titulo;
	@Column(name = "costo")
	Long costo;
	@Column(name = "id_curso")
	Long idCurso;
	@Column(name = "stock")
	Long stock;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Long getCosto() {
		return costo;
	}

	public void setCosto(Long costo) {
		this.costo = costo;
	}

	public Long getIdCurso() {
		return idCurso;
	}

	public void setIdCurso(Long id_curso) {
		this.idCurso = id_curso;
	}

	public Long getStock() {
		return stock;
	}

	public void setStock(Long stock) {
		this.stock = stock;
	}

}
