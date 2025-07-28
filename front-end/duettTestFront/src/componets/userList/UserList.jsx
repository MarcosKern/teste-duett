import React, { useContext, useEffect } from "react";
import userContext from "../../context/Context";
import UserListCard from "../userListCard/UserListCard";
import "./userList.css";

export default function UserList() {
  const { getUsers, usersList } = useContext(userContext);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="users-list">
      {usersList.map((user) => {
        return (
          <UserListCard
            name={user.name}
            email={user.email}
            cpf={user.cpf}
            key={user.cpf}
            role={user.role}
          />
        );
      })}
    </div>
  );
}
