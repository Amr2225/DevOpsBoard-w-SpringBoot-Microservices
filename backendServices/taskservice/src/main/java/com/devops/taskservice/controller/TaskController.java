package com.devops.taskservice.controller;

import org.springframework.web.bind.annotation.RestController;

import com.devops.taskservice.dto.AssignedTaskRequest;
import com.devops.taskservice.dto.TaskRequest;
import com.devops.taskservice.dto.TaskResponse;
import com.devops.taskservice.dto.UpdateTaskRequest;
import com.devops.taskservice.model.Task;
import com.devops.taskservice.service.TaskService;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/api/Task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // Tasks ///
    // for testing purposes only
    @GetMapping("/getTaskss")
    @ResponseStatus(HttpStatus.OK)
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }
    ////

    // CREATE
    @PostMapping("/addTask")
    @ResponseStatus(HttpStatus.CREATED)
    public void addTask(@RequestBody TaskRequest taskrequest) {
        taskService.addTask(taskrequest);
    }

    // READ
    @GetMapping("/getTasks")
    @ResponseStatus(HttpStatus.OK)
    public List<TaskResponse> getAllTasks(@RequestParam("userId") Integer userId, @PathParam("role") Integer role,
            @PathParam("projectId") Integer projectId) {
        return taskService.getAllTasks(userId, role, projectId);

    }

    // DELETE
    @DeleteMapping("/deleteTask")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteTask(@PathParam("taskId") Integer taskId) {
        taskService.deleteTask(taskId);
    }

    // UPDATE
    @PutMapping("/UpdateTask")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateTask(@RequestBody UpdateTaskRequest request) {
        taskService.updateTask(request);
    }
    // End of Tasks Controllers //

    // Assigned Tasks //
    @PostMapping("/AssignTask")
    @ResponseStatus(HttpStatus.CREATED)
    public void assignTask(@RequestBody AssignedTaskRequest request) {
        taskService.createAssignedTask(request);
    }

    // UPDATE
    @PostMapping("/AttachFile")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void attachFile(@RequestBody AssignedTaskRequest request) {
        taskService.attachFile(request);
    }

    @GetMapping("/GetAllAttachedTasks")
    @ResponseStatus(HttpStatus.OK)
    public void getAttachments() {
        taskService.GetAllAttachedTasks();
    }
}
