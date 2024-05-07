package com.devops.projectservice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.devops.projectservice.dto.ProjectsRequest;
import com.devops.projectservice.dto.UpdateProjectRequest;
import com.devops.projectservice.model.Project;
import com.devops.projectservice.service.ProjectService;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProjectServiceController {

    private final ProjectService projectService;

    @PostMapping("/Create")
    @ResponseStatus(HttpStatus.CREATED)
    public void addProject(@RequestBody ProjectsRequest projectrequest) {
        projectService.addProject(projectrequest);
    }

    @GetMapping("/GetAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Project> getProjects() {
        return projectService.getAllProjects();
    }

    @DeleteMapping("/DeleteProject")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteProject(@PathParam("projectId") Integer projectId) {
        projectService.deleteProject(projectId);
    }

    @PutMapping("/UpdateProject")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateProject(@RequestBody UpdateProjectRequest req) {
        projectService.updProject(req);

    }
}
