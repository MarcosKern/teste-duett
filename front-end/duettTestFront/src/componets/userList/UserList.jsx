import React, { useContext, useEffect } from 'react'
import userContext from '../../context/Context'
import UserListCard from '../userListCard/UserListCard';

export default function UserList() {
    const { getUsers, usersList } = useContext(userContext);

    useEffect(() => {
        getUsers();
    }, [])
  return (
    <div>
        {usersList.map((user) => {
            return <UserListCard name={user.name} email={user.email} cpf={user.cpf} key={user.cpf} role={user.role} />
        })}
    </div>
  )
}
