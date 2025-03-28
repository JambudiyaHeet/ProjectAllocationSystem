package com.projectallocation.projectallocation.service;
import java.util.List;
import com.projectallocation.projectallocation.Entity.Student;

public interface StudentService {
	public List<Student> getStudent();

	public Student getStudentById(int id);

	public Student AddStudent(Student student);

	Student UpdateStudent(Student student);

	void DeleteStudent(int studentid);
	
	Student getStudentByEmail(String email);
	
	Student updateIsGroupJoin(int studentId, Boolean isgroupjoin);

}
