package com.projectallocation.projectallocation.controller;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @CrossOrigin
    @PostMapping("/project")
    public Project addProject(@RequestBody Project project) {
        System.out.println(project);
        // Save the project
        return projectservice.AddProject(project);
    }
    // public Project AddProject(@RequestBody Project project) {
    // return this.projectservice.AddProject(project);
    // }

    private String saveImage(MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            return null;
        }
        // Create the upload directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        // Save the file
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), filePath);
        return UPLOAD_DIR + fileName;
    }
}
