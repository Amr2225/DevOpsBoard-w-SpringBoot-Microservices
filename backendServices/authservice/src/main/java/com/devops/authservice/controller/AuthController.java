package com.devops.authservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.devops.authservice.dto.LoginRequest;
import com.devops.authservice.dto.RegisterRequest;
import com.devops.authservice.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/Auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/Register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterRequest request) {
        authService.Register(request);
    }

    @PostMapping("/Login")
    @ResponseStatus(HttpStatus.OK)
    public String Login(@RequestBody LoginRequest request) {
        return authService.Login(request); // return the jwt token
    }

}
