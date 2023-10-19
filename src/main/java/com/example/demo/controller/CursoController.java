package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.CursoService;
import com.example.demo.entity.Curso;
import com.example.demo.entity.Tema;

@RestController
public class CursoController {
	@Autowired
	CursoService cursoService;
	
	@RequestMapping(value = "/cursos", method = RequestMethod.GET, produces = "application/json")
	public List<Curso> getCursos() {
		return cursoService.findAllCurso();
	}
	
	@RequestMapping(value = "/cursos/{id}", method = RequestMethod.GET, produces = "application/json")
	public Optional<Curso> getCurso(@PathVariable("id") Long id) {
		return cursoService.findCursoById(id);
	}
	
	@RequestMapping(value = "/cursos/buscar/{nombre}", method = RequestMethod.GET, produces = "application/json")
	public List<Curso> findCurso(@PathVariable String nombre) {
		return cursoService.findLikeNombre("%" + nombre + "%");
	}
	
	@RequestMapping(value = "/cursos", method = RequestMethod.PUT, produces = "application/json")
	public String updateCurso(@RequestBody Curso curso) {
		return cursoService.updateCurso(curso);
	}
	
	@RequestMapping(value = "/cursos", method = RequestMethod.POST, produces = "application/json")
	public Curso addCurso(@RequestBody Curso curso) {
		return cursoService.saveCurso(curso);
	}
	
	@RequestMapping(value = "/cursos/{id}", method = RequestMethod.DELETE, produces = "application/json")
	public String deletePost(@PathVariable Long id) {
		return cursoService.deleteCurso(id);
	}

}
