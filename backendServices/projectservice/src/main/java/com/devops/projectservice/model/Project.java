package com.devops.projectservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gives us the getters and setters
@Entity
@Builder
@AllArgsConstructor // A constructor will all the arguments
@NoArgsConstructor
public class Project {
    @Id
    @SequenceGenerator(name = "project_id_sequence", sequenceName = "project_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "project_id_sequence")
    private Integer id;
    private String title;
}
