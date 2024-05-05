package com.devops.taskservice.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class gives the composite primary key
@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class AssignedTaskId implements Serializable {
    private Integer userId;
    private Integer taskId;
}
