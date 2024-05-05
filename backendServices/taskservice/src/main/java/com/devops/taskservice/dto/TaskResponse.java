package com.devops.taskservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    private Integer Id;
    private String Title;
    private String Description;
    private String Status;
    private Boolean Editable;
}
