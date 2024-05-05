package com.devops.taskservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignedTaskRequest {
    private Integer userId;
    private Integer taskId;
    private String attachment;
}
