// package com.projectallocation.projectallocation.Entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;

// @Entity
// public class Project {
	
// 	@Id
// 	int id;
// 	String Defination;
// 	int MaxStudentAllow;
// 	String deadline;
	
// 	@Override
// 	public String toString() {
// 		return "Project [id=" + id + ", Defination=" + Defination + ", MaxStudentAllow=" + MaxStudentAllow
// 				+ ", deadline=" + deadline + "]";
// 	}
// 	public Project() {
// 		super();
// 		// TODO Auto-generated constructor stub
// 	}
// 	public Project(int id, String defination, int maxStudentAllow, String deadline) {
// 		super();
// 		this.id = id;
// 		Defination = defination;
// 		MaxStudentAllow = maxStudentAllow;
// 		this.deadline = deadline;
// 	}
// 	public int getId() {
// 		return id;
// 	}
// 	public void setId(int id) {
// 		this.id = id;
// 	}
// 	public String getDefination() {
// 		return Defination;
// 	}
// 	public void setDefination(String defination) {
// 		Defination = defination;
// 	}
// 	public int getMaxStudentAllow() {
// 		return MaxStudentAllow;
// 	}
// 	public void setMaxStudentAllow(int maxStudentAllow) {
// 		MaxStudentAllow = maxStudentAllow;
// 	}
// 	public String getDeadline() {
// 		return deadline;
// 	}
// 	public void setDeadline(String deadline) {
// 		this.deadline = deadline;
// 	}
// }

package com.projectallocation.projectallocation.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String title; // New field for project title
    String type; // New field for project type (e.g., AI-Based, Web, etc.)
    int maxStudentAllow; // Existing field for maximum students allowed
    String deadline; // Existing field for deadline
    String difficultyLevel; // New field for difficulty level (e.g., Easy, Medium, Hard)
    String description; // New field for project description
    String additionalNotes; // New field for additional notes
    String image; // New field for project image URL

    @Override
    public String toString() {
        return "Project [id=" + id + ", title=" + title + ", type=" + type +
                ", maxStudentAllow=" + maxStudentAllow + ", deadline=" + deadline + ", difficultyLevel=" + difficultyLevel +
                ", description=" + description + ", additionalNotes=" + additionalNotes + ", image=" + image + "]";
    }

    public Project() {
        super();
    }

    public Project(int id, String title, String type, int maxStudentAllow, String deadline,
                   String difficultyLevel, String description, String additionalNotes, String image) {
        super();
        this.id = id;
        this.title = title;
        this.type = type;
        this.maxStudentAllow = maxStudentAllow;
        this.deadline = deadline;
        this.difficultyLevel = difficultyLevel;
        this.description = description;
        this.additionalNotes = additionalNotes;
        this.image = image;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public int getmaxStudentAllow() {
        return maxStudentAllow;
    }

    public void setmaxStudentAllow(int maxStudentAllow) {
        this.maxStudentAllow = maxStudentAllow;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}