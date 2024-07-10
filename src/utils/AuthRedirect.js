import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("user");

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    } else {
      navigate(`/home/${id}`, { replace: true });
    }
  }, [token]);

  return null;
};

export default AuthRedirect;
