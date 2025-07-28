import React, { useContext, useState } from "react";
import axios from "axios";
import "./registerForm.css";
import userContext from "../../context/Context";

export default function RegisterForm() {
  const { path, changeModalStatus } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const hasNumber = /.*\d.*/;
  const hasLowerCase = /.*[a-z]/;
  const hasUpperCase = /.*[A-Z]/;
  const hasSpecial = /.*[$*&@#]/;
  const validateCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

  function validateFields() {
    if (
      hasNumber.test(password) &&
      hasLowerCase.test(password) &&
      hasUpperCase.test(password) &&
      hasSpecial.test(password) &&
      password.length >= 8 &&
      validateCpf.test(cpf) &&
      password == confirmationPassword
    ) {
      return false;
    }
    return true;
  }

  function register(name, email, cpf, password) {
    axios
      .post(`${path}/user/register`, {
        name,
        email,
        cpf,
        password,
        role: "USER",
      })
      .then(function (response) {
        changeModalStatus(response.data, response.status);
        setEmail("");
        setName("");
        setCpf("");
        setPassword("");
        setConfirmationPassword("");
      })
      .catch(function (error) {
        changeModalStatus(error.response.data, error.response.status);
      });
  }

  function testPassword(regex) {
    return regex.test(password) ? "test-passed" : "test-failed";
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        register(name, email, cpf, password);
      }}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onInput={({ target }) => setEmail(target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nome de usuario"
        value={name}
        onInput={({ target }) => setName(target.value)}
        required
      />
      <input
        type="text"
        placeholder="CPF do usuario"
        value={cpf}
        onInput={({ target }) => setCpf(target.value)}
        required
      />
      {validateCpf.test(cpf) ? null : <p>Formato de cpf invalido</p>}
      <input
        type="password"
        value={password}
        placeholder="Senha"
        onInput={({ target }) => setPassword(target.value)}
        required
      />
      <div>
        <p>A senha deve conter ao minimo:</p>
        <p className={testPassword(hasUpperCase)}>Uma letra maiuscula.</p>
        <p className={testPassword(hasLowerCase)}>Uma letra minuscula.</p>
        <p className={testPassword(hasNumber)}>Um número.</p>
        <p className={testPassword(hasSpecial)}>Um caaractere especial.</p>
        <p className={password.length >= 8 ? "test-passed" : "test-failed"}>
          8 caracteres.
        </p>
      </div>
      <input
        type="password"
        value={confirmationPassword}
        placeholder="Confirme sua senha"
        onInput={({ target }) => setConfirmationPassword(target.value)}
        required
      />
      {password == confirmationPassword ? null : (
        <p>As senhas não são iguais.</p>
      )}
      <button type="submit" disabled={validateFields()}>
        Registrar
      </button>
    </form>
  );
}
