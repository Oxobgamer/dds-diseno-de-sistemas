package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {

	void save(Optional<Material> materialToUpdate);
		
	List<Material> findByTituloLike(String title);
	
	List<Material> findByIdCurso(Long id_curso);
}
