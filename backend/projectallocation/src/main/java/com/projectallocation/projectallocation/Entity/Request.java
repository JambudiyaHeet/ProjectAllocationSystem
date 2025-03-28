package com.projectallocation.projectallocation.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int senderId; // ID of the student who sends the request
    private int receiverId; // ID of the student who receives the request
    private String projectDefinition; // Project details
    private String status; // Status of the request (e.g., PENDING, ACCEPTED, DECLINED)
    private int projectid;
    

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public String getProjectDefinition() {
        return projectDefinition;
    }

    public void setProjectDefinition(String projectDefinition) {
        this.projectDefinition = projectDefinition;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public int getProjectid() {
		return projectid;
	}

	public void setProjectid(int projectid) {
		this.projectid = projectid;
	}
}