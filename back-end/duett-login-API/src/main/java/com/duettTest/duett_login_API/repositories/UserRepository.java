package com.duettTest.duett_login_API.repositories;

import com.duettTest.duett_login_API.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByCpf(String cpf);
}
