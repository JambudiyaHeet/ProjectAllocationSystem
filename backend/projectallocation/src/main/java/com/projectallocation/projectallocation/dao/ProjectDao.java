package com.projectallocation.projectallocation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectallocation.projectallocation.Entity.Project;

public interface ProjectDao extends JpaRepository<Project, Integer> {

}
