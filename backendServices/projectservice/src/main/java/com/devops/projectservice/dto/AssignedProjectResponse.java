package com.devops.projectservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignedProjectResponse {
    private Integer userId;
    private Integer projectId;
    private String status;
    private String title;
}
