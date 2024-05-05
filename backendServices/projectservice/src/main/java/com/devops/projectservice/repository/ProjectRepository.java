package com.devops.projectservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devops.projectservice.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {

}
