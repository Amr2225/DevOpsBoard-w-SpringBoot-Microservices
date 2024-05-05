package com.devops.projectservice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devops.projectservice.dto.AssignedProjectRequest;
import com.devops.projectservice.model.ProjectAssigned;
import com.devops.projectservice.model.ProjectAssignedId;
import com.devops.projectservice.repository.AssignedProjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AssignedProjectService {

    private final AssignedProjectRepository repo;

    public void AssignProject(AssignedProjectRequest req) {
        ProjectAssignedId id = new ProjectAssignedId(req.getUserId(), req.getProjectId());
        ProjectAssigned assignedProject = new ProjectAssigned(id, req.getStatus());

        repo.save(assignedProject);
    }

    public List<AssignedProjectRequest> getByStatus(Integer userId, String status) {
        List<ProjectAssigned> projects = repo.findById_UserIdAndStatus(userId, status);

        List<AssignedProjectRequest> res = new ArrayList<AssignedProjectRequest>();

        for (ProjectAssigned project : projects) {
            res.add(new AssignedProjectRequest(project.getId().getUserId(),
                    project.getId().getProjectId(), project.getStatus()));
        }

        return res;
    }

    public List<AssignedProjectRequest> getAllAssigned() {
        List<ProjectAssigned> assignedProjects = repo.findAll();

        List<AssignedProjectRequest> res = new ArrayList<AssignedProjectRequest>();

        for (ProjectAssigned assignedProject : assignedProjects) {
            res.add(new AssignedProjectRequest(assignedProject.getId().getUserId(),
                    assignedProject.getId().getProjectId(), assignedProject.getStatus()));
        }

        return res;
    }

    public void updateProjectAssigned(AssignedProjectRequest req) {
        ProjectAssigned projectAssigned;

        try {
            projectAssigned = this.findAssigned(req.getUserId(), req.getProjectId());

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }

        projectAssigned.setStatus(req.getStatus());

        repo.save(projectAssigned);
    }

    public void deleteProjectAssigned(Integer projectId, Integer userId) {
        ProjectAssigned projectAssigned;

        try {
            projectAssigned = findAssigned(userId, projectId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The resource you are looking for does not exist.");
        }

        repo.delete(projectAssigned);
    }

    private ProjectAssigned findAssigned(Integer userId, Integer projectId) {
        ProjectAssignedId id = new ProjectAssignedId(userId, projectId);
        return repo.findById(id).orElseThrow(null);
    }
}