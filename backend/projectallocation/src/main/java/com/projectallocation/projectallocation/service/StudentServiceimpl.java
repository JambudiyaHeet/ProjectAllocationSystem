package com.projectallocation.projectallocation.service;
import com.projectallocation.projectallocation.Entity.Student;
import com.projectallocation.projectallocation.dao.StudentDao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projectallocation.projectallocation.Entity.Student;

@Service
public class StudentServiceimpl implements StudentService {
	
	@Autowired
	private StudentDao studentdao;
	public StudentServiceimpl() {
		
	}

	@Override
	public List<Student> getStudent() {
		return studentdao.findAll();
	}

	@Override
	public Student getStudentById(int studentid) {
//		Student s=null;
//		for(Student student:list) {
//			if(student.getId()==studentid)
//				{
//					s=student;
//					break;
//				}
//		}
		return studentdao.getOne(studentid);
	}

	@Override
	public Student AddStudent(Student student) {
		studentdao.save(student);
		return student;
	}
	
	@Override
	public Student UpdateStudent(Student student) {
		
		studentdao.save(student);
		return student;
	}
	
	@Override
	public void DeleteStudent(int studentid) {
		studentdao.deleteById(studentid);
	}
	
    @Override
    public Student getStudentByEmail(String email) {
        return studentdao.findByEmail(email);
    }
    
    @Override
    public Student updateIsGroupJoin(int studentId, Boolean isgroupjoin) {
        Student student = studentdao.findById(studentId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setIsgroupjoin(isgroupjoin);
        return studentdao.save(student);
    }
}
