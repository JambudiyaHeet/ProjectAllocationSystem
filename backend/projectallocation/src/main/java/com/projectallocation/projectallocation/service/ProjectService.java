package com.projectallocation.projectallocation.service;

import java.util.List;

import com.projectallocation.projectallocation.Entity.Project;

public interface ProjectService {
	public List<Project> getProject();

	public Project getProjectById(int id);

	public Project AddProject(Project project);

	Project UpdateProject(Project project);

	void DeleteProject(int projectId);
}
