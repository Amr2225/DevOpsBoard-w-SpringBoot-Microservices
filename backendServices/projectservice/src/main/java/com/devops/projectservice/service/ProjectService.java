package com.devops.projectservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devops.projectservice.dto.ProjectsRequest;
import com.devops.projectservice.dto.UpdateProjectRequest;
import com.devops.projectservice.model.Project;
import com.devops.projectservice.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public void addProject(ProjectsRequest projectRequest) {
        Project project = Project.builder().title(projectRequest.getTitle()).build();

        projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProject(Integer id) {
        Optional<Project> project = projectRepository.findById(id);

        if (!project.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project Not Found");

        Project projectToDelete = project.get();
        projectRepository.delete(projectToDelete);
    }

    public void updProject(UpdateProjectRequest req) {
        Optional<Project> optionalProject = projectRepository.findById(req.getId());

        if (!optionalProject.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such project exists : " + req.getId());

        Project project = optionalProject.get();
        project.setTitle(req.getTitle());

        projectRepository.save(project);

    }
}
