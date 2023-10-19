package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Curso;
import com.example.demo.entity.Tema;

public interface CursoRepository extends JpaRepository<Curso, Long> {

	void save(Optional<Curso> CursoToUpdate);
	
	List<Curso> findByNombreLike(String nombre);
}
