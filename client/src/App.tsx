import React, { FC, useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!store.isAuth) {
    return (
      <div className="App">
        <h2>Авторизуйтесь</h2>
        <LoginForm />
        <div>
          <button onClick={getUsers}>Получить пользователей</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h2>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : `Авторизуйтесь`}
      </h2>
      <h3>
        {store.user.isActivated
          ? "Аккаунт активирован по почте"
          : "АКТИВИРУЙТЕ АККАУНТ"}
      </h3>
      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      <div>
        <ul>
          {users.map((user) => {
            console.log(user.id);
            return <li key={user.email}>{user.email}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default observer(App);
