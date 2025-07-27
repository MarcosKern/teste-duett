import React, { useContext, useState } from "react";
import userContext from "../../context/Context";
import ResponseModal from "../responseModal/ResponseModal"
import LoginForm from "../loginForm/LoginForm";
import RegisterForm from "../registerForm/RegisterForm";
import "./loginPage.css"

export default function LoginPage() {
  const {showResponseModal, responseMsg, responseStatus } = useContext(userContext);
  const [method, setMethod] = useState("login");

  return (
    <main>
      <div>
        <button
          disabled={method == "login"}
          type="button"
          onClick={() => {
            setMethod("login");
          }}
        >
          Login
        </button>
        <button
          disabled={method == "register"}
          type="button"
          onClick={() => {
            setMethod("register");
          }}
        >
          Cadastrar
        </button>
      </div>
      {method == "login" ? <LoginForm/> : <RegisterForm/>}
      <section>
        <h1>Duett</h1>
        <h1>Software</h1>
      </section>
      {showResponseModal ? <ResponseModal responseMsg={responseMsg} status={responseStatus}/> : null}
    </main>
  );
}
