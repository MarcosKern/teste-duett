import React, { useContext } from "react";
import userContext from "../../context/Context";
import trashCan from "../../assets/icons/icons8-trash.svg";
import "./userListCard.css";

export default function UserListCard({ name, email, cpf, role, key }) {
  const { deleteUser } = useContext(userContext);
  return (
    <div key={key} className="user-card">
      <p>Nome: {name}</p>
      <p>Email: {email}</p>
      <p>CPF: {cpf}</p>
      <p>Role: {role}</p>
      {role == "ADMIN" ? null : (
        <button onClick={() => deleteUser(cpf)}>
          {" "}
          <img src={trashCan} alt="" />{" "}
        </button>
      )}
    </div>
  );
}
