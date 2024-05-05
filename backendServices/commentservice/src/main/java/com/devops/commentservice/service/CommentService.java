package com.devops.commentservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devops.commentservice.dto.CommentRequest;
import com.devops.commentservice.model.Comment;
import com.devops.commentservice.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public List<Comment> getComments(Integer taskId) {
        return commentRepository.findByTaskId(taskId);
    }

    public void createComment(CommentRequest commentRequest) {
        Comment comment = Comment.builder().userId(commentRequest.getUserId()).taskId(commentRequest.getTaskId())
                .comment(commentRequest.getComment()).build();

        commentRepository.save(comment);
    }
}
