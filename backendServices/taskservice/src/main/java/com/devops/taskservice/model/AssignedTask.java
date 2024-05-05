package com.devops.taskservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gives us the getters and setters
@Entity // To make a table in the database
@Builder
@AllArgsConstructor // A constructor will all the arguments
@NoArgsConstructor // Makes a constructor without any arguments
public class AssignedTask {

    @EmbeddedId // Composite primary key
    private AssignedTaskId id; // Composite primary key
    private String attachment;
}
