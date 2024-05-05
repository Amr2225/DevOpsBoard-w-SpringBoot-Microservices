package com.devops.userservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Gives us the getters and setters
@Entity
@Builder
@AllArgsConstructor // A constructor will all the arguments
@NoArgsConstructor // Makes a constructor without any arguments
public class Users {

    @Id
    @SequenceGenerator(name = "user_id_sequence", sequenceName = "user_id_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_sequence")
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Integer roleId;
}
