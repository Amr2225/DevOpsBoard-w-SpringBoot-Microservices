package com.devops.authservice.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.devops.authservice.dto.RegisterRequest;

@Aspect
@Component
public class registerValidate {

    @Before("execution(* com.devops.authservice.controller.AuthController.register(..)) && args(request, ..)")
    public void validateUser(RegisterRequest request) {
        if (!isValidName(request.getFirstName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name should not contain numbers.");
        }
        if (!isValidName(request.getLastName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name should not contain numbers.");
        }
        if (!isValidEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email address");
        }
        if (!isValidPassword(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password should have at least one uppercase letter, one lowercase letter, one digit, and minimum 8 characters.");
        }
    }

    private boolean isValidName(String name) {
        return !name.matches(".*\\d.*");
    }

    private boolean isValidEmail(String email) {
        return email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$");
    }

    private boolean isValidPassword(String password) {
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$");
    }

}
