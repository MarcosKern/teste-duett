import React, { useState } from "react";
import UserInfo from "../userInfo/UserInfo";
import ChangePassword from "../changePassword/ChangePassword";
import "./configurations.css";

export default function Configurations() {
  const [module, setmodule] = useState("infos");
  function changeSection() {
    switch (module) {
      case "Infos":
        return <UserInfo />;
      case "Password":
        return <ChangePassword />;
      default:
        return <UserInfo />;
    }
  }
  return (
    <section className="configurations">
      <aside>
        <button
          onClick={() => setmodule("Infos")}
          className={
            module == "Infos"
              ? "active configurations_aside_button"
              : "configurations_aside_button"
          }
        >
          Informações do usuário
        </button>
        <button
          onClick={() => setmodule("Password")}
          className={
            module == "Password"
              ? "active configurations_aside_button"
              : "configurations_aside_button"
          }
        >
          Mudar senha
        </button>
      </aside>
      <section>{changeSection()}</section>
    </section>
  );
}
