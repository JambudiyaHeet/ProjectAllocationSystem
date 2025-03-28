package com.projectallocation.projectallocation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectallocation.projectallocation.Entity.Faculty;

public interface FacultyDao extends JpaRepository<Faculty, Integer> {

	Faculty findByEmail(String email);
}
