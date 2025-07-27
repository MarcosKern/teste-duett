import React, { useContext } from 'react'
import userContext from '../../context/Context'

export default function UserListCard({name, email, cpf, role, key}) {
  const {deleteUser} = useContext(userContext)
  return (
    <div key={key}>
      <p>Nome:        {name}</p>
      <p>Email:       {email}</p>
      <p>CPF:         {cpf}</p>
      <p>Role:        {role}</p>
      {role == "ADMIN" ? null : <button onClick={() => deleteUser(cpf)}>Delete</button>}
    </div>
  )
}
