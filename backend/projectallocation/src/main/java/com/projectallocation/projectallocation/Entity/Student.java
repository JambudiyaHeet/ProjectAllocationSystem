// package com.projectallocation.projectallocation.Entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;

// @Entity
// public class Student {
	
// 	@Id
// 	private int id;
// 	private String name;
// 	private int roll_no;
// 	private double cpi;
	
// 	public long getId() {
// 		return id;
// 	}
// 	public void setId(int id) {
// 		this.id = id;
// 	}
// 	public String getName() {
// 		return name;
// 	}
// 	public void setName(String name) {
// 		this.name = name;
// 	}
// 	public int getRoll_no() {
// 		return roll_no;
// 	}
// 	@Override
// 	public String toString() {
// 		return "Student [id=" + id + ", name=" + name + ", roll_no=" + roll_no + ", cpi=" + cpi + "]";
// 	}
// 	public Student() {
// 		super();
// 		// TODO Auto-generated constructor stub
// 	}
// 	public Student(int id, String name, int roll_no, double d) {
// 		super();
// 		this.id = id;
// 		this.name = name;
// 		this.roll_no = roll_no;
// 		this.cpi = d;
// 	}
// 	public void setRoll_no(int roll_no) {
// 		this.roll_no = roll_no;
// 	}
// 	public double getCpi() {
// 		return cpi;
// 	}
// 	public void setCpi(float cpi) {
// 		this.cpi = cpi;
// 	}
	
// }
package com.projectallocation.projectallocation.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the ID
    private int id;

    private String name;
    private String email;
    private String password;
    private double cpi;
    private String project1;
    private String project2;
    private String project3;
    private boolean isgroupjoin;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public double getCpi() {
        return cpi;
    }

    public void setCpi(double cpi) {
        this.cpi = cpi;
    }

    public String getProject1() {
        return project1;
    }

    public void setProject1(String project1) {
        this.project1 = project1;
    }

    public String getProject2() {
        return project2;
    }

    public void setProject2(String project2) {
        this.project2 = project2;
    }

    public String getProject3() {
        return project3;
    }

    public void setProject3(String project3) {
        this.project3 = project3;
    }

    // Constructors
    public Student() {
		super();
    }

    public Student(String name, String email, String password, int roll_no, double cpi, String project1, String project2, String project3,boolean isgroupjoin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpi = cpi;
        this.project1 = project1;
        this.project2 = project2;
        this.project3 = project3;
        this.isgroupjoin = isgroupjoin;
    }
 
    public boolean getIsgroupjoin() {
    	return isgroupjoin;
    }
    
    public void setIsgroupjoin(boolean isgroupjoin) {
    	this.isgroupjoin = isgroupjoin;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", cpi=" + cpi +
                ", project1='" + project1 + '\'' +
                ", project2='" + project2 + '\'' +
                ", project3='" + project3 + '\'' +
                ", isgroupjoin='" + isgroupjoin + '\'' +
                '}';
    }

}