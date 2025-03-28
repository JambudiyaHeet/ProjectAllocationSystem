// package com.projectallocation.projectallocation.Entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;

// @Entity
// public class Faculty {
	
// 	@Id
// 	int id;
// 	String name;
// 	String branch;
// 	int experience;
// 	public int getId() {
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
// 	public String getBranch() {
// 		return branch;
// 	}
// 	public void setBranch(String branch) {
// 		this.branch = branch;
// 	}
// 	public int getExperience() {
// 		return experience;
// 	}
// 	public void setExperience(int experience) {
// 		this.experience = experience;
// 	}
// 	@Override
// 	public String toString() {
// 		return "Faculty [id=" + id + ", name=" + name + ", branch=" + branch + ", experience=" + experience + "]";
// 	}
// 	public Faculty(int id, String name, String branch, int experience) {
// 		super();
// 		this.id = id;
// 		this.name = name;
// 		this.branch = branch;
// 		this.experience = experience;
// 	}
// 	public Faculty() {
// 		super();
// 		// TODO Auto-generated constructor stub
// 	}
// }

package com.projectallocation.projectallocation.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.List;

@Entity
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the ID
    private int id;
    private String name;
    private String branch;
    private List<String> expertise;
    private int maxGroups;
    private String image;
    private String bio;
    private String email;
    private String password;
    private String phone;
    private String officeHours;
    private List<String> ongoingProjects;
    private List<String> awards;

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

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<String> getExpertise() {
        return expertise;
    }

    public void setExpertise(List<String> expertise) {
        this.expertise = expertise;
    }

    public int getMaxGroups() {
        return maxGroups;
    }

    public void setMaxGroups(int maxGroups) {
        this.maxGroups = maxGroups;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getOfficeHours() {
        return officeHours;
    }

    public void setOfficeHours(String officeHours) {
        this.officeHours = officeHours;
    }

    public List<String> getOngoingProjects() {
        return ongoingProjects;
    }

    public void setOngoingProjects(List<String> ongoingProjects) {
        this.ongoingProjects = ongoingProjects;
    }

    public List<String> getAwards() {
        return awards;
    }

    public void setAwards(List<String> awards) {
        this.awards = awards;
    }

    public Faculty(int id, String name, String branch, int experience, List<String> expertise, int maxGroups, String image, String bio, String email, String password, String phone, String officeHours, List<String> ongoingProjects, List<String> awards) {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.expertise = expertise;
        this.maxGroups = maxGroups;
        this.image = image;
        this.bio = bio;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.officeHours = officeHours;
        this.ongoingProjects = ongoingProjects;
        this.awards = awards;
    }

    @Override
    public String toString() {
        return "Faculty{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", branch='" + branch + '\'' +
                ", expertise=" + expertise +
                ", maxGroups=" + maxGroups +
                ", image='" + image + '\'' +
                ", bio='" + bio + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", officeHours='" + officeHours + '\'' +
                ", ongoingProjects=" + ongoingProjects +
                ", awards=" + awards +
                '}';
    }
	public Faculty() {
				super();
	}
}
