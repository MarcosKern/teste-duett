import React, { useContext, useState } from "react";
import userContext from "../../context/Context";
import axios from "axios";

export default function LoginForm() {
  const {
    setUserName,
    setUserCpf,
    setUserEmail,
    setUserToken,
    setUserRole,
    navigate,
    changeModalStatus,
    path
  } = useContext(userContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function userLogin(email, password) {
    axios
      .post(`${path}/user/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        const loginResponse = response.data;
        setUserName(loginResponse.name);
        setUserEmail(loginResponse.email);
        setUserCpf(loginResponse.cpf);
        setUserToken(loginResponse.token);
        setUserRole(loginResponse.role);
        navigate("/home");
      })
      .catch(function (error) {
        changeModalStatus(error.response.data, error.response.status)
        setPassword("")
      });
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        userLogin(email, password);
      }}
    >
      <input
        type="email"
        placeholder="Email"
        onInput={({ target }) => setEmail(target.value)}
        required
      />
      <input
        type="password"
        value={password}
        placeholder="Senha"
        onInput={({ target }) => setPassword(target.value)}
        required
      />
      <button type="submit" disabled={!(email.length > 0 && password.length > 0)}>Logar</button>
    </form>
  );
}
