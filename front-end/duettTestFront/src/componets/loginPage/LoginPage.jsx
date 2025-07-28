import React, { useContext, useState } from "react";
import userContext from "../../context/Context";
import ResponseModal from "../responseModal/ResponseModal";
import LoginForm from "../loginForm/LoginForm";
import RegisterForm from "../registerForm/RegisterForm";
import "./loginPage.css";

export default function LoginPage() {
  const { showResponseModal, responseMsg, responseStatus } =
    useContext(userContext);
  const [method, setMethod] = useState("login");

  return (
    <main>
      <aside>
        <div className="button-switch">
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
            <span className={`${method == "login" ? "switch-left" : "switch-right"} switch`}></span>
        </div>
        {method == "login" ? <LoginForm /> : <RegisterForm />}
      </aside>
      <section className="main-page-section">
        <h1>Duett</h1>
        <h1>Software</h1>
      </section>
      {showResponseModal ? (
        <ResponseModal responseMsg={responseMsg} status={responseStatus} />
      ) : null}
    </main>
  );
}
