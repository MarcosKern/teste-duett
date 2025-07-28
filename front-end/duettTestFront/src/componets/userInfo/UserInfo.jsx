import React, { useContext } from "react";
import userContext from "../../context/Context";
import "./userInfo.css";

export default function UserInfo() {
  const { userName, userEmail, userCpf, userRole } = useContext(userContext);

  return (
    <div className="user-info">
      <h2>Informações do usuário</h2>
      <p>Nome: {userName}</p>
      <p>Email: {userEmail}</p>
      <p>CPF: {userCpf}</p>
      <p>
        Este perfil possui autorizações de nivel{" "}
        {userRole == "ADMIN" ? "administrador" : "simples"}.
      </p>
    </div>
  );
}
