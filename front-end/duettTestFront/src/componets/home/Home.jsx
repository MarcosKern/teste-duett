import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/Context";
import HelloWorld from "../helloWorld/HelloWorld";
import UserList from "../userList/UserList";
import Configurations from "../configurations/Configurations";
import ResponseModal from "../responseModal/ResponseModal";
import "./home.css";

export default function Home() {
  const {
    userName,
    userRole,
    validateToken,
    logOut,
    showResponseModal,
    responseMsg,
    responseStatus,
  } = useContext(userContext);
  const [page, setPage] = useState("");

  useEffect(() => {
    validateToken();
  }, []);

  function changeFunction() {
    switch (page) {
      case "Configs":
        return <Configurations />;
      case "Users":
        return <UserList />;
      case "Home":
        return <HelloWorld />;
      default:
        return <HelloWorld />;
    }
  }

  return (
    <main className="home-main">
      <aside>
        <h2>{userName}</h2>
        <div>
          <button
            onClick={() => setPage("Home")}
            className={
              page == "Home"
                ? "active home-main_aside_button"
                : "home-main_aside_button"
            }
          >
            Home
          </button>
          <button
            onClick={() => setPage("Configs")}
            className={
              page == "Configs"
                ? "active home-main_aside_button"
                : "home-main_aside_button"
            }
          >
            Configurações
          </button>
          {userRole == "ADMIN" ? (
            <button
              onClick={() => setPage("Users")}
              className={
                page == "Users"
                  ? "active home-main_aside_button"
                  : "home-main_aside_button"
              }
            >
              Usuários
            </button>
          ) : null}
          <button
            onClick={() => logOut()}
            className="logout home-main_aside_button"
          >
            Logout
          </button>
        </div>
      </aside>
      <section>{changeFunction()}</section>
      {showResponseModal ? (
        <ResponseModal responseMsg={responseMsg} status={responseStatus} />
      ) : null}
    </main>
  );
}
