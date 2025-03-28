package com.projectallocation.projectallocation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projectallocation.projectallocation.Entity.Faculty;
import com.projectallocation.projectallocation.service.FacultyService;

@RestController
public class FacultyController {

	@Autowired
	private FacultyService facultyservice;
	
	@CrossOrigin
	@GetMapping("/faculty")
	public List<Faculty> getFaculty(){
		return this.facultyservice.getFaculty();
	}
	
	@CrossOrigin
	@GetMapping("/faculty/{facultyid}")
	public Faculty getFacultyById(@PathVariable String facultyid) {
		return this.facultyservice.getFacultyById(Integer.parseInt(facultyid));
	}
	
	@CrossOrigin
	@PostMapping("/faculty")
	public Faculty AddFaculty(@RequestBody Faculty faculty) {
		return this.facultyservice.AddFaculty(faculty);
	}
}
