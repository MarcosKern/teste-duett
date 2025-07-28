package com.duettTest.duett_login_API.controllers;

import com.duettTest.duett_login_API.domain.user.User;
import com.duettTest.duett_login_API.dto.*;
import com.duettTest.duett_login_API.exceptions.UserNotFoundException;
import com.duettTest.duett_login_API.infra.security.TokenService;
import com.duettTest.duett_login_API.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final TokenService tokenService;

    @GetMapping
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("Sucesso");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO body) {
        try {
            User user = this.repository.findByEmail(body.email()).orElseThrow(UserNotFoundException::new);
            if (encoder.matches(body.password(), user.getPassword())) {
                String token = this.tokenService.generateToken(user);
                return ResponseEntity.ok(new ResponseDTO(user.getName(), user.getEmail(), user.getCpf(), token, user.getRole()));
            }
            return ResponseEntity.badRequest().body("Email ou senha incorretos.");
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body("Email ou senha incorretos.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO body) {
        Optional<User> testUserEmail = this.repository.findByEmail(body.email());
        Optional<User> testUserCpf = this.repository.findByCpf(body.cpf());

        if(testUserEmail.isPresent() & testUserCpf.isPresent()) return ResponseEntity.badRequest().body("O CPF e email já estão em uso.");

        if(testUserEmail.isPresent()) return ResponseEntity.badRequest().body("O email já está em uso.");

        if(testUserCpf.isPresent()) return ResponseEntity.badRequest().body("O CPF já está em uso.");

        String encryptedPassword = this.encoder.encode(body.password());
        User user = new User(body.name(), body.email(), body.cpf(), encryptedPassword, body.role());
        this.repository.save(user);

        return ResponseEntity.ok("Usuario registrado com sucesso.");
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(this.repository.findAll());
    }

    @PatchMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequestDTO body) {
        try {
            User user = this.repository.findByCpf(body.cpf()).orElseThrow(UserNotFoundException::new);
            if (encoder.matches(body.password(), user.getPassword())) {
                String encryptedPassword = this.encoder.encode(body.newPassword());
                user.setPassword(encryptedPassword);
                this.repository.save(user);
                return ResponseEntity.ok("Senha atualizada com sucesso.");
            }
            return ResponseEntity.badRequest().body("Senha incorreta, tente novamente.");
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody DeleteRequestDTO body) {
        try {
            User user = this.repository.findByCpf(body.cpf()).orElseThrow(UserNotFoundException::new);
            this.repository.deleteById(user.getId());
            return ResponseEntity.ok("Deletado com sucesso.");
        } catch (UserNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
