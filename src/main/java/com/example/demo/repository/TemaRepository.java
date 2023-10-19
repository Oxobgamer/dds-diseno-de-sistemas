package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Tema;

public interface TemaRepository extends JpaRepository<Tema, Long> {

	void save(Optional<Tema> TemaToUpdate);
		
	List<Tema> findByNombreLike(String nombre);
}
