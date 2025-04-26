package com.projectallocation.projectallocation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projectallocation.projectallocation.Entity.Student;
import com.projectallocation.projectallocation.service.StudentService;

@RestController
public class StudentController {
	
	@Autowired
	private StudentService studentservice;
	
	@CrossOrigin
	@GetMapping("/student")
	public List<Student> getStudent(){
		return this.studentservice.getStudent();
	}
	
	@CrossOrigin
	@GetMapping("/student/{studentid}")
	public Student getStudentById(@PathVariable int studentid) {
		System.out.println(studentid);
		// return this.studentservice.getStudentById(Integer.parseInt(studentid));
		return this.studentservice.getStudentById(studentid);
	}
	
	@CrossOrigin
	@PostMapping("/student")
	public Student AddStudent(@RequestBody Student student) {
		System.out.println(student.toString());
		return this.studentservice.AddStudent(student);
	}
	
	@CrossOrigin
	@PutMapping("/student/{studentId}/isgroupjoin")
	public Student updateIsGroupJoin(@PathVariable int studentId, @RequestParam Boolean isgroupjoin) {
	    return studentservice.updateIsGroupJoin(studentId, isgroupjoin);
	}
}
