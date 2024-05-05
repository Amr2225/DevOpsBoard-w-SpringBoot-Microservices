package com.devops.userservice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.devops.userservice.dto.UserResponse;
import com.devops.userservice.model.Users;
import com.devops.userservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserResponse> getUsers() {
        List<Users> users = userRepository.findAll();
        List<UserResponse> usersToSent = new ArrayList<UserResponse>();
        for (Users user : users) {
            String userName = user.getFirstName() + " " + user.getLastName();
            usersToSent.add(new UserResponse(user.getId(), userName, user.getEmail(), user.getRoleId()));
        }

        return usersToSent;
    }

}
