package com.projectallocation.projectallocation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projectallocation.projectallocation.service.ProjectService;

import com.projectallocation.projectallocation.Entity.Project;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectservice;
    private static final String UPLOAD_DIR = "uploads/";

    @CrossOrigin
    @GetMapping("/project")
    public List<Project> getProject() {
        return this.projectservice.getProject();
    }

    @CrossOrigin
    @GetMapping("/project/{projectid}")
    public Project getProjectById(@PathVariable String projectid) {
        return this.projectservice.getProjectById(Integer.parseInt(projectid));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/project")
    public Project addProject(@RequestBody Project project) {
        System.out.println(project);
        // Save the project
        return projectservice.AddProject(project);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/project/{projectid}")
    public Project updateProject(@PathVariable int projectid, @RequestBody Project updatedProject) {
        return projectservice.updateProject(projectid, updatedProject);
    }

}
