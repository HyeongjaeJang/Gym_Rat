import { useState } from "react";
import { createPortal } from "react-dom";
import "./MainCom.scss";
import Sign from "../Sign/Sign";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";

const MainCom = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <>
      <div className="main-container bg-primary-light dark:bg-primary-dark">
        {createPortal(
          <Signup
            open={form}
            onClose={() => setForm(false)}
            onOpen={() => setLogin(true)}
          />,
          document.body,
        )}
        {createPortal(
          <Login
            open={login}
            onClose={() => setLogin(false)}
            onOpen={() => setForm(true)}
          />,
          document.body,
        )}

        <img
          src="/assets/logo.svg"
          alt="placeholder"
          onClick={() => setOpen(true)}
        />
        <h1 className="main-container__title">Gym Rat</h1>
        <Sign
          open={open}
          onClose={() => setOpen(false)}
          onSignClick={() => setForm(true)}
          onLoginClick={() => setLogin(true)}
        />
      </div>
    </>
  );
};

export default MainCom;
