package com.projectallocation.projectallocation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectallocation.projectallocation.Entity.Student;

public interface StudentDao extends JpaRepository<Student, Integer> {

	 Student findByEmail(String email);
}
