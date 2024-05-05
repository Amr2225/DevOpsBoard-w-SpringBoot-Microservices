package com.devops.authservice.service;

import java.util.Date;
import java.util.Optional;

import com.auth0.jwt.*;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.devops.authservice.dto.LoginRequest;
import com.devops.authservice.dto.RegisterRequest;
import com.devops.authservice.model.Users;
import com.devops.authservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor // For dependency injection
public class AuthService {

    private final UserRepository userRepository;
    private final String secretKey = "your-secret-key";
    private final long expirationTime = 3600000;

    public void Register(RegisterRequest registerRequest) {
        Optional<Users> foundUser = userRepository.findByEmail(registerRequest.getEmail());

        if (foundUser.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already has an account");

        Users user = Users.builder().firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .roleId(registerRequest.getRoleId()).build();

        userRepository.save(user);
    }

    public String Login(LoginRequest loginRequest) {
        Optional<Users> foundUser = userRepository.findByEmail(loginRequest.getEmail());
        if (!foundUser.isPresent())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or password is invalid");

        Users user = foundUser.get();
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or password is invalid");
        }

        try {
            String token = generateToken(user);
            return token;
        } catch (JWTCreationException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating token", e);
        }
    }

    private String generateToken(Users user) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationTime);
        String userName = user.getFirstName() + " " + user.getLastName();

        return JWT.create()
                .withIssuedAt(now)
                .withExpiresAt(expiration)
                .withClaim("userName", userName)
                .withClaim("email", user.getEmail())
                .withClaim("id", user.getId())
                .withClaim("roleId", user.getRoleId())
                .sign(algorithm);
    }

}
