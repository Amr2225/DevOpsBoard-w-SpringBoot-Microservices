package com.devops.taskservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devops.taskservice.model.AssignedTask;
import com.devops.taskservice.model.AssignedTaskId;

//Composite primary key
@Repository
public interface AssignedTaskRepository extends JpaRepository<AssignedTask, AssignedTaskId> {
    List<AssignedTask> findById_UserId(Integer userId);

    List<AssignedTask> findById_TaskId(Integer taskId);
}
