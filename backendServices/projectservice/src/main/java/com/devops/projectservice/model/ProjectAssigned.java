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
@NoArgsConstructor // A constructor without any args
public class ProjectAssigned {

    @EmbeddedId
    private ProjectAssignedId id;
    private String status;
}
