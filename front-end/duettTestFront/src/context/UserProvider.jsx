import { useMemo, useState } from "react";
import userContext from "./Context";
import { useNavigate } from "react-router";
import axios from "axios";

export default function UserProvider({ children }) {
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userCpf, setUserCpf] = useState();
  const [userToken, setUserToken] = useState("");
  const [userRole, setUserRole] = useState();
  const [usersList, setUsersList] = useState([]);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseStatus, setResponseStatus] = useState("");

  let navigate = useNavigate();
  const path = import.meta.env.VITE_API_URL || "http://localhost:8080";

  function changeModalStatus(response, status) {
    setResponseMsg(response);
    setResponseStatus(status);
    setShowResponseModal(true);
    setTimeout(() => {
      setShowResponseModal(false);
    }, 5000);
  }

  function logOut() {
    setUserName("");
    setUserCpf("");
    setUserCpf("");
    setUserToken("");
    setUserRole("");
    setUsersList([]);
    navigate("/");
  }

  function validateToken() {
    axios
      .get(`${path}/user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        navigate("/");
      });
  }

  function getUsers() {
    axios
      .get(`${path}/user/findAll`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        const responseData = response.data;
        const newUserList = responseData.map((user) => {
          return {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            role: user.role,
          };
        });
        setUsersList(newUserList);
      })
      .catch((error) => {
        changeModalStatus(error.response.data, error.response.status);
      });
  }

  function deleteUser(cpf) {
    axios
      .delete(`${path}/user/delete`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          cpf,
        },
      })
      .then((response) => {
        changeModalStatus(response.data, response.status);
        getUsers();
      })
      .catch((error) => {
        changeModalStatus(error.response.data, error.response.status);
      });
  }

  const state = useMemo(
    () => ({
      logOut,
      setUserName,
      userName,
      setUserEmail,
      userEmail,
      setUserCpf,
      userCpf,
      setUserToken,
      userToken,
      setUserRole,
      userRole,
      setUsersList,
      usersList,
      validateToken,
      navigate,
      getUsers,
      deleteUser,
      path,
      showResponseModal,
      setShowResponseModal,
      responseMsg,
      responseStatus,
      changeModalStatus,
    }),
    [
      logOut,
      setUserName,
      userName,
      setUserEmail,
      userEmail,
      setUserCpf,
      userCpf,
      setUserToken,
      userToken,
      setUserRole,
      userRole,
      setUsersList,
      usersList,
      validateToken,
      navigate,
      getUsers,
      deleteUser,
      path,
      showResponseModal,
      setShowResponseModal,
      responseMsg,
      responseStatus,
      changeModalStatus,
    ]
  );

  return <userContext.Provider value={state}>{children}</userContext.Provider>;
}
