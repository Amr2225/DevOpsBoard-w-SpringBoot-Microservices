package com.devops.taskservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTaskRequest {
    private Integer id;
    private String title;
    private String description;
    private Integer projectId;
    private String status;
}
