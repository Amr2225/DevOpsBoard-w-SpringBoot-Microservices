package com.devops.taskservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gives us the getters and setters
@Entity
@Builder
@AllArgsConstructor // A constructor will all the arguments
@NoArgsConstructor // Makes a constructor without any arguments
public class Task {

    @Id
    @SequenceGenerator(name = "task_id_sequence", sequenceName = "task_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_id_sequence")
    private Integer id;
    private String title;
    private String description;
    private Integer projectId;
    private String status;

}
