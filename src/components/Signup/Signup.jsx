import { useState } from "react";
import axios from "axios";
import "./Signup.scss";

const Signup = ({ open, onClose, onOpen }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;
    if (!name || !email || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }

    try {
      const newUser = await axios.post(
        "http://localhost:8080/api/user/signup",
        {
          name,
          email,
          password,
        },
      );

      if (newUser.data.status === "success") {
        onClose();
        onOpen();
      }
    } catch (error) {
      console.error("Signup failed: ", error);
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
            Sign Up
          </h1>
          <img src="/assets/hero.svg" />
          <div className="signUp-container__inputs">
            <label className="signUp-container__label text-primary-dark dark:text-primary-light">
              Name
            </label>
            <input
              type="text"
              className={`form-input input__name ${form.name !== "" ? "fill" : "empty"}`}
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <label className="signUp-container__label text-primary-dark dark:text-primary-light">
              Email
            </label>
            <input
              type="email"
              className={`form-input input__email ${form.email !== "" ? "fill" : "empty"}`}
              placeholder="Email"
              name="email"
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
            />
            <label className="signUp-container__label text-primary-dark dark:text-primary-light">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-input input__confirm-password ${form.confirmPassword !== "" ? "fill" : "empty"}`}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="signUp-container__button" type="submit">
            Sign Up
          </button>
          <p className="signUp-container__text text-primary-dark dark:text-primary-light">
            Already have an account?
            <span
              className="span"
              onClick={() => {
                onClose();
                onOpen();
              }}
            >
              Log In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
