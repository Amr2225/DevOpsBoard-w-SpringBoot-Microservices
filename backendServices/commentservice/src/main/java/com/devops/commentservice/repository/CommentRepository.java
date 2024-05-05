package com.devops.commentservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devops.commentservice.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByTaskId(Integer taskId);
}
