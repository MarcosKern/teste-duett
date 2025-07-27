import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/Context";
import HelloWorld from "../helloWorld/HelloWorld";
import UserList from "../userList/UserList";
import Configurations from "../configurations/Configurations";
import ResponseModal from "../responseModal/ResponseModal";

export default function Home() {
  const { userName, userRole, validateToken, logOut, showResponseModal, responseMsg, responseStatus } = useContext(userContext);
  const [page, setPage] = useState("");

  useEffect(() => {
    validateToken();
  }, []);

  function changeFunction() {
    switch (page) {
      case "Configs":
        return <Configurations/>
      case "Users":
        return <UserList/>
      default:
        return <HelloWorld />;
    }
  }

  return (
    <div>
      <aside>
        <p>{userName}</p>
        <div>
          <button onClick={() => setPage("Configs")}>Configurações</button>
          {userRole == "ADMIN" ? <button onClick={() => setPage("Users")}>Usuarios</button> : null}
          <button onClick={() => logOut()}>Sair</button>
        </div>
      </aside>
      <section>{changeFunction()}</section>
      {showResponseModal ? <ResponseModal responseMsg={responseMsg} status={responseStatus}/> : null}
    </div>
  );
}
