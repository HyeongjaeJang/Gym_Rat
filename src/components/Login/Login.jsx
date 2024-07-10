import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ open, onClose, onOpen }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      return;
    }
    const newUser = await axios.post("http://localhost:8080/api/user/login", {
      email,
      password,
    });
    if (newUser.data.status === "success") {
      sessionStorage.setItem("token", newUser.data.token);
      sessionStorage.setItem("user", JSON.stringify(newUser.data.id));
      onClose();
      navigate("/home");
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="overlay bg-gray-50 bg-opacity-50 dark:bg-opacity-10"
      data-aos="fade-down"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="signUp-form bg-primary-light dark:bg-primary-dark"
        onSubmit={handleSubmit}
      >
        <div className="signUp-container">
          <h1 className="signUp-container__title text-primary-dark dark:text-primary-pupple">
            Sign In
          </h1>
          <img src="/assets/hero.svg" />
          <div className="signUp-container__inputs">
            <label className="signUp-container__label text-primary-dark dark:t:wext-primary-light">
              Email
            </label>
            <input
              type="email"
              className={`form-input input__email ${form.email !== "" ? "fill" : "empty"}`}
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <label className="signUp-container__label text-primary-dark dark:text-primary-light">
              Password
            </label>
            <input
              type="password"
              className={`form-input input__password ${form.password !== "" ? "fill" : "empty"}`}
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <button className="signUp-container__button" type="submit">
            Log In
          </button>
          <p className="signUp-container__text text-primary-dark dark:text-primary-light">
            Don't have an account?
            <span
              className="span"
              onClick={() => {
                onClose();
                onOpen();
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
