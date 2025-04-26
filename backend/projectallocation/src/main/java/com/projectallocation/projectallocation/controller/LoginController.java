// package com.projectallocation.projectallocation.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// import com.projectallocation.projectallocation.Entity.Student;
// import com.projectallocation.projectallocation.Entity.Faculty;
// import com.projectallocation.projectallocation.Entity.LoginRequest;
// import com.projectallocation.projectallocation.service.StudentService;
// import com.projectallocation.projectallocation.service.FacultyService;

// @RestController
// public class LoginController {

//     @Autowired
//     private StudentService studentService;

//     @Autowired
//     private FacultyService facultyService;

//     @CrossOrigin
//     @PostMapping("/login")
//     public Object login(@RequestBody LoginRequest loginRequest) {
//         String email = loginRequest.getEmail();
//         String password = loginRequest.getPassword();
//         String role = loginRequest.getRole();

//         if ("Student".equals(role)) {
//             Student student = studentService.getStudentByEmail(email);
//             if (student != null && student.getPassword().equals(password)) {
//                 return student; // Return the complete Student object
//             }
//         } else if ("Faculty".equals(role)) {
//             Faculty faculty = facultyService.getFacultyByEmail(email);
//             if (faculty != null && faculty.getPassword().equals(password)) {
//                 return faculty; // Return the complete Faculty object
//             }
//         }

//         return "Invalid credentials or role";
//     }
// }
package com.projectallocation.projectallocation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projectallocation.projectallocation.Entity.Student;
import com.projectallocation.projectallocation.Entity.Faculty;
import com.projectallocation.projectallocation.Entity.LoginRequest;
import com.projectallocation.projectallocation.service.StudentService;
import com.projectallocation.projectallocation.service.FacultyService;

@RestController
public class LoginController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private FacultyService facultyService;

    @CrossOrigin
    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String role = loginRequest.getRole();

        if ("Student".equals(role)) {
            Student student = studentService.getStudentByEmail(email);
            if (student != null && student.getPassword().equals(password)) {
                return student; // Return the complete Student object
            }
        } else if ("Faculty".equals(role)) {
            Faculty faculty = facultyService.getFacultyByEmail(email);
            if (faculty != null && faculty.getPassword().equals(password)) {
                return faculty; // Return the complete Faculty object
            }
        }

        return "Invalid credentials or role";
    }
}