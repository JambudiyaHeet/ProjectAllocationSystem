package com.projectallocation.projectallocation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectallocation.projectallocation.Entity.Project;
import com.projectallocation.projectallocation.dao.ProjectDao;

@Service
public class ProjectServiceimpl implements ProjectService {

	@Autowired
	private ProjectDao projectDao;

	public ProjectServiceimpl() {
	}

	@Override
	public List<Project> getProject() {
		return projectDao.findAll();
	}

	@Override
	public Project getProjectById(int projectId) {
		return projectDao.getOne(projectId);
	}

	@Override
	public Project AddProject(Project project) {
		projectDao.save(project);
		return project;
	}

	// @Override
	// public Project UpdateProject(Project project) {
	// projectDao.save(project);
	// return project;
	// }
	public Project updateProject(int projectId, Project updatedProject) {
		Project existingProject = projectDao.findById(projectId)
				.orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

		existingProject.setSecondPartner(updatedProject.getSecondPartner());
		existingProject.setFirstPartner(updatedProject.getFirstPartner());
		existingProject.setMentor(updatedProject.getMentor());

		return projectDao.save(existingProject);
	}

	@Override
	public void DeleteProject(int projectId) {
		projectDao.deleteById(projectId);
	}

}
