package com.projectallocation.projectallocation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projectallocation.projectallocation.Entity.Request;

public interface RequestDao extends JpaRepository<Request, Integer> {
    // Custom queries can be added here if needed
	List<Request> findByReceiverId(int receiverId);
	
	// @Modifying
	// @Query("DELETE FROM Request r WHERE r.receiverId = :receiverId")
	// void deleteByReceiverId(@Param("receiverId") int receiverId);
	@Modifying
	@Query("DELETE FROM Request r WHERE r.receiverId = :receiverId AND r.status != 'ACCEPTED'")
	void deleteByReceiverId(@Param("receiverId") int receiverId);
}