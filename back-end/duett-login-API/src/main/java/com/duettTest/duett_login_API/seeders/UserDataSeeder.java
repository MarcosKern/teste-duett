package com.duettTest.duett_login_API.seeders;

import com.duettTest.duett_login_API.domain.user.User;
import com.duettTest.duett_login_API.domain.user.UserRole;
import com.duettTest.duett_login_API.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class UserDataSeeder {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostConstruct
    public void seedData() {
        if (userRepository.count() == 0) {
            List<User> users = Arrays.asList(
                    new User("João Admin", "admin@email.com","000.000.000-00", encoder.encode("123456789"), UserRole.ADMIN),
                    new User("Clarisse", "clar_ice@email.com", "111.111.111-11", encoder.encode("123456789"), UserRole.USER)
            );

            userRepository.saveAll(users);
            System.out.println("Dados iniciais inseridos com sucesso!");
        }
    }
}
