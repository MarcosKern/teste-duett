package com.duettTest.duett_login_API.dto;

import com.duettTest.duett_login_API.domain.user.UserRole;

public record ResponseDTO (String name, String email, String cpf, String token, UserRole role) {
}
