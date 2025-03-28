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

	@Override
	public Project UpdateProject(Project project) {
	    projectDao.save(project);
	    return project;
	}

	@Override
	public void DeleteProject(int projectId) {
	    projectDao.deleteById(projectId);
	}

	
}
