import React, { useState } from "react";
import UserInfo from "../userInfo/UserInfo";
import ChangePassword from "../changePassword/ChangePassword";

export default function Configurations() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [module, setmodule] = useState("infos")
  function changeSection() {
    switch (module) {
      case "infos":
        return <UserInfo/>;
      case "password":
        return <ChangePassword/>
      default:
        return <UserInfo/>;
    }
  }
  return (
    <section>
      <aside>
        <button onClick={() => setmodule("infos")}>Informações do usuario</button>
        <button onClick={() => setmodule("password")}>Mudar senha</button>
      </aside>
      <section>
        {changeSection()}
      </section>
    </section>
  );
}
