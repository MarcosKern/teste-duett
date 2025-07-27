package com.duettTest.duett_login_API.dto;

import com.duettTest.duett_login_API.domain.user.UserRole;

public record RegisterRequestDTO (String name, String email, String password, String cpf, UserRole role) {
}
