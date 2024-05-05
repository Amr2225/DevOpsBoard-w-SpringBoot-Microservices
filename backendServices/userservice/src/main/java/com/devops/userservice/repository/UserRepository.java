package com.devops.userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devops.userservice.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
}
