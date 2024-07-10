import { useState, useEffect } from "react";
import api from "../api/api.js";

function useUser(id) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(id);
  }, [id]);

  const fetchUser = async (id) => {
    try {
      const data = await api.getUser(id);
      setUser(data);
    } catch (error) {
      setError(error);
    }
  };
  return { user, error };
}

export default useUser;
