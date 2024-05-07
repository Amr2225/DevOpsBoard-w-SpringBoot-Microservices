package com.devops.taskservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devops.taskservice.dto.AssignedDevsResponse;
import com.devops.taskservice.dto.AssignedTaskRequest;
import com.devops.taskservice.dto.TaskRequest;
import com.devops.taskservice.dto.TaskResponse;
import com.devops.taskservice.dto.UpdateTaskRequest;
import com.devops.taskservice.model.AssignedTask;
import com.devops.taskservice.model.AssignedTaskId;
import com.devops.taskservice.model.Task;
import com.devops.taskservice.repository.AssignedTaskRepository;
import com.devops.taskservice.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // Makes a constructor for dependencies injection
public class TaskService {

    private final TaskRepository taskRepository;

    private final AssignedTaskRepository assignedTaskRepository;

    // TASK APIs //

    // POST
    public void addTask(TaskRequest taskRequest) {
        Task task = Task.builder().title(taskRequest.getTitle()).description(taskRequest.getDescription())
                .projectId(taskRequest.getProjectId()).status(taskRequest.getStatus()).build();

        taskRepository.save(task);
    }

    // Testing purpose
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    /////

    // GET
    public List<TaskResponse> getAllTasks(Integer userId, Integer role, Integer projectId) {
        var tasks = taskRepository.findByProjectId(projectId);
        if (tasks == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task not found");

        List<TaskResponse> tasksToSent = new ArrayList<>();
        for (int i = 0; i < tasks.size(); i++) {
            tasksToSent.add(new TaskResponse(tasks.get(i).getId(),
                    tasks.get(i).getTitle(),
                    tasks.get(i).getDescription(),
                    tasks.get(i).getStatus(),
                    role == 2));
        }

        if (role == 2)
            return tasksToSent;

        List<AssignedTask> assignedUsersToTask = assignedTaskRepository.findById_UserId(userId);
        for (AssignedTask assignedTask : assignedUsersToTask) {
            for (TaskResponse task : tasksToSent) {
                if (task.getId().equals(assignedTask.getId().getTaskId())) {
                    task.setEditable(true);
                }
            }
        }

        return tasksToSent;
    }

    // Delete
    public void deleteTask(Integer id) {
        Optional<Task> task = taskRepository.findById(id);

        if (!task.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such task exists : " + id);

        Task taskToDelte = task.get();
        taskRepository.delete(taskToDelte);
    }

    // Update
    public void updateTask(UpdateTaskRequest req) {
        Optional<Task> optionalTask = taskRepository.findById(req.getId());

        if (!optionalTask.isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found: " + req.getId());

        Task task = optionalTask.get();
        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        task.setProjectId(req.getProjectId());
        task.setStatus(req.getStatus());

        taskRepository.save(task);
    }
    // END OF TASK APIs //

    // Assigned Tasks //
    // CREATE
    public AssignedTask createAssignedTask(AssignedTaskRequest request) {
        AssignedTaskId id = new AssignedTaskId(request.getUserId(), request.getTaskId()); // New Composite primary key
        AssignedTask assignedTask = new AssignedTask(id, request.getAttachment());

        return assignedTaskRepository.save(assignedTask);
    }

    // UPDATE ATTACHMENT
    public void attachFile(AssignedTaskRequest request) {
        AssignedTask task;
        try {
            task = this.findAssignedTask(request.getUserId(), request.getTaskId());

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found: ");

        }

        task.setAttachment(request.getAttachment());

        assignedTaskRepository.save(task);
    }

    // GET ALL ATTACHMENTS -- userId taskId, attachment
    public List<AssignedTaskRequest> GetAllAttachedTasks() {
        List<AssignedTask> tasks = assignedTaskRepository.findAll();
        List<AssignedTaskRequest> taskToSent = new ArrayList<AssignedTaskRequest>();

        for (AssignedTask task : tasks) {
            if (task.getAttachment() != null) {
                taskToSent.add(new AssignedTaskRequest(task.getId().getUserId(), task.getId().getTaskId(),
                        task.getAttachment()));
            }
        }

        return taskToSent;
    }

    // GET ALL THE ASSIGNED DEVS BASED ON THE TASK --DEV & TEAM LEADER API--
    public List<AssignedDevsResponse> getAssignedDevs(Integer taskId) {
        List<AssignedTask> assignedTasks = assignedTaskRepository.findById_TaskId(taskId);
        if (assignedTasks == null)
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found: " + taskId);

        List<AssignedDevsResponse> usersId = new ArrayList<AssignedDevsResponse>();
        for (AssignedTask assignedTask : assignedTasks) {
            usersId.add(new AssignedDevsResponse(assignedTask.getId().getUserId()));
        }

        return usersId;
    }

    // Find a assigned task
    private AssignedTask findAssignedTask(Integer userId, Integer taskId) {
        AssignedTaskId id = new AssignedTaskId(userId, taskId);
        return assignedTaskRepository.findById(id).orElse(null);
    }
}
