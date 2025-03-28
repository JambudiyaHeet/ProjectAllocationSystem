package com.projectallocation.projectallocation.service;

import java.util.List;

import com.projectallocation.projectallocation.Entity.Faculty;

public interface FacultyService {
	public List<Faculty> getFaculty();

	public Faculty getFacultyById(int id);

	public Faculty AddFaculty(Faculty faculty);

	Faculty UpdateFaculty(Faculty faculty);

	void deleteFaculty(int facultyId);
	
	Faculty getFacultyByEmail(String email);
}
