package com.devops.projectservice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.devops.projectservice.dto.AssignedProjectRequest;
import com.devops.projectservice.service.AssignedProjectService;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/api/Project")
@RequiredArgsConstructor
public class ProjectAssignedController {

    private final AssignedProjectService assignedProjectService;

    @PostMapping("/AssignProject")
    @ResponseStatus(HttpStatus.CREATED)
    public void AssignPorject(@RequestBody AssignedProjectRequest assignedProjectRequest) {
        assignedProjectService.AssignProject(assignedProjectRequest);
    }

    @GetMapping("/GetAllAssignedProjects")
    @ResponseStatus(HttpStatus.OK)
    public List<AssignedProjectRequest> getAllAssigned() {
        return assignedProjectService.getAllAssigned();
    }

    @GetMapping("/GetProjectsByStatus")
    @ResponseStatus(HttpStatus.OK)
    public List<AssignedProjectRequest> getPending(@PathParam("userId") Integer userId,
            @PathParam("status") String status) {
        return assignedProjectService.getByStatus(userId, status);
    }

    @PutMapping("/UpdateAssignedProject")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void UpdateAssignedProject(@RequestBody AssignedProjectRequest assignedProjectRequest) {
        assignedProjectService.updateProjectAssigned(assignedProjectRequest);
    }

    @DeleteMapping("/DeleteAssignedProject")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteProject(@PathParam("projectId") Integer projectId, @PathParam("userId") Integer userId) {
        assignedProjectService.deleteProjectAssigned(projectId, userId);
    }

}
