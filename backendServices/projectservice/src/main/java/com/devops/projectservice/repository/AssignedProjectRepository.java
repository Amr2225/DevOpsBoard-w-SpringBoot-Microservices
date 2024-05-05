package com.devops.projectservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devops.projectservice.model.ProjectAssigned;
import com.devops.projectservice.model.ProjectAssignedId;

@Repository
public interface AssignedProjectRepository extends JpaRepository<ProjectAssigned, ProjectAssignedId> {
	List<ProjectAssigned> findByStatus(String status);

	List<ProjectAssigned> findById_UserIdAndStatus(Integer userId, String status);
}
