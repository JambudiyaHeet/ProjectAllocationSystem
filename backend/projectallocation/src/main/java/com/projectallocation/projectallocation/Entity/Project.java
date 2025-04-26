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

    int id; // Primary Key
    String title; // Project title
    String definition; // Project definition (short)
    int maxStudentAllow; // Maximum students allowed
    String deadline; // Deadline for the project
    String image; // Project image URL
    String level; // Level (maybe same as difficulty_level?)
    String type; // Project type (e.g., AI-Based, Web, etc.)
    String additionalNotes; // Additional notes for the project
    String description; // Full project description
    String difficultyLevel; // Difficulty level (Easy, Medium, Hard)
    String progLang1; // Programming language 1
    String progLang2; // Programming language 2
    String progLang3; // Programming language 3
    String databaseUsed; // Database used
    boolean isregistered;
    String firstPartner;
    String secondPartner;
    String mentor;

    public Project() {
    }

    public Project(String title, String definition, int maxStudentAllow, String deadline, String image, String level,
            String type, String additionalNotes, String description, String difficultyLevel, String progLang1,
            String progLang2, String progLang3, String databaseUsed, boolean isregistered, String firstPartner,
            String secondPartner, String mentor) {
        this.title = title;
        this.definition = definition;
        this.maxStudentAllow = maxStudentAllow;
        this.deadline = deadline;
        this.image = image;
        this.level = level;
        this.type = type;
        this.additionalNotes = additionalNotes;
        this.description = description;
        this.difficultyLevel = difficultyLevel;
        this.progLang1 = progLang1;
        this.progLang2 = progLang2;
        this.progLang3 = progLang3;
        this.databaseUsed = databaseUsed;
        this.isregistered = isregistered;
        this.firstPartner = firstPartner;
        this.secondPartner = secondPartner;
        this.mentor = mentor;
    }

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

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public int getMaxStudentAllow() {
        return maxStudentAllow;
    }

    public void setMaxStudentAllow(int maxStudentAllow) {
        this.maxStudentAllow = maxStudentAllow;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getProgLang1() {
        return progLang1;
    }

    public void setProgLang1(String progLang1) {
        this.progLang1 = progLang1;
    }

    public String getProgLang2() {
        return progLang2;
    }

    public void setProgLang2(String progLang2) {
        this.progLang2 = progLang2;
    }

    public String getProgLang3() {
        return progLang3;
    }

    public void setProgLang3(String progLang3) {
        this.progLang3 = progLang3;
    }

    public String getDatabaseUsed() {
        return databaseUsed;
    }

    public void setDatabaseUsed(String databaseUsed) {
        this.databaseUsed = databaseUsed;
    }

    public boolean isIsregistered() {
        return isregistered;
    }

    public void setIsregistered(boolean isregistered) {
        this.isregistered = isregistered;
    }

    public String getFirstPartner() {
        return firstPartner;
    }

    public void setFirstPartner(String firstPartner) {
        this.firstPartner = firstPartner;
    }

    public String getSecondPartner() {
        return secondPartner;
    }

    public void setSecondPartner(String secondPartner) {
        this.secondPartner = secondPartner;
    }

    public String getMentor() {
        return mentor;
    }

    public void setMentor(String mentor) {
        this.mentor = mentor;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Project{");
        sb.append("id=").append(id);
        sb.append(", title=").append(title);
        sb.append(", definition=").append(definition);
        sb.append(", maxStudentAllow=").append(maxStudentAllow);
        sb.append(", deadline=").append(deadline);
        sb.append(", image=").append(image);
        sb.append(", level=").append(level);
        sb.append(", type=").append(type);
        sb.append(", additionalNotes=").append(additionalNotes);
        sb.append(", description=").append(description);
        sb.append(", difficultyLevel=").append(difficultyLevel);
        sb.append(", progLang1=").append(progLang1);
        sb.append(", progLang2=").append(progLang2);
        sb.append(", progLang3=").append(progLang3);
        sb.append(", databaseUsed=").append(databaseUsed);
        sb.append(", isregistered=").append(isregistered);
        sb.append(", firstPartner=").append(firstPartner);
        sb.append(", secondPartner=").append(secondPartner);
        sb.append(", mentor=").append(mentor);
        sb.append('}');
        return sb.toString();
    }

}