import React, { useContext, useState } from "react";
import axios from "axios";
import userContext from "../../context/Context";
import "./changePassword.css";

export default function ChangePassword() {
  const { userCpf, userToken, path, changeModalStatus } =
    useContext(userContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const hasNumber = /.*\d.*/;
  const hasLowerCase = /.*[a-z]/;
  const hasUpperCase = /.*[A-Z]/;
  const hasSpecial = /.*[$*&@#]/;

  function validateFields() {
    if (
      hasNumber.test(newPassword) &&
      hasLowerCase.test(newPassword) &&
      hasUpperCase.test(newPassword) &&
      hasSpecial.test(newPassword) &&
      newPassword.length >= 8 &&
      newPassword == confirmNewPassword
    ) {
      return false;
    }
    return true;
  }

  function testPassword(regex) {
    return regex.test(newPassword) ? "test-passed" : "test-failed";
  }

  function confirmChange() {
    axios
      .patch(
        `${path}/user/updatePassword`,
        {
          password,
          newPassword,
          cpf: userCpf,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        changeModalStatus(response.data, response.status);
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
        changeModalStatus(error.response.data, error.response.status);
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        confirmChange();
      }}
      className="change-password"
    >
      <h2>Mudar senha</h2>
      <input
        type="password"
        value={password}
        placeholder="Senha"
        onInput={({ target }) => setPassword(target.value)}
        required
      />
      <input
        type="password"
        value={newPassword}
        placeholder="Nova senha"
        onInput={({ target }) => setNewPassword(target.value)}
        required
      />
      <div>
        <p className="tests-title">A senha deve conter ao minimo:</p>
        <p className={testPassword(hasUpperCase)}>Uma letra maiuscula.</p>
        <p className={testPassword(hasLowerCase)}>Uma letra minuscula.</p>
        <p className={testPassword(hasNumber)}>Um número.</p>
        <p className={testPassword(hasSpecial)}>Um caaractere especial.</p>
        <p className={newPassword.length >= 8 ? "test-passed" : "test-failed"}>
          8 caracteres.
        </p>
      </div>
      <input
        type="password"
        value={confirmNewPassword}
        placeholder="Confirme a nova senha"
        onInput={({ target }) => setConfirmNewPassword(target.value)}
        required
      />
      {newPassword == confirmNewPassword ? null : (
        <p className="tests-title">As senhas não são iguais.</p>
      )}
      <button type="submit" disabled={validateFields()}>
        Confirmar nova senha
      </button>
    </form>
  );
}
