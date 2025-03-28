package com.projectallocation.projectallocation.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectallocation.projectallocation.Entity.Faculty;
import com.projectallocation.projectallocation.dao.FacultyDao;

@Service
public class FacultyServiceimpl implements FacultyService {

	@Autowired
	private FacultyDao facultyDao;
	public FacultyServiceimpl() {
		
	}

	@Override
	public List<Faculty> getFaculty() {
	    return facultyDao.findAll();
	}

	@Override
	public Faculty getFacultyById(int facultyId) {
	    return facultyDao.getOne(facultyId);
	}

	@Override
	public Faculty AddFaculty(Faculty faculty) {
	    facultyDao.save(faculty);
	    return faculty;
	}

	@Override
	public Faculty UpdateFaculty(Faculty faculty) {
	    facultyDao.save(faculty);
	    return faculty;
	}

	@Override
	public void deleteFaculty(int facultyId) {
	    facultyDao.deleteById(facultyId);
	}
	
	@Override
    public Faculty getFacultyByEmail(String email) {
        return facultyDao.findByEmail(email);
    }

}
