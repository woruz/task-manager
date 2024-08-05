import { useState } from "react";
import { toast } from "react-toastify";

let url = "http://localhost:4001/api/auth";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (body,setIsLoggedIn,setUsername) => {
    setLoading(true);
    setError(null);
    console.log(body);
    const { email, password } = body;
    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data.success){
            localStorage.setItem("token", data.result.token);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("username", data.result.user.username)
            setIsLoggedIn(true)
            setUsername(data.result.user.username)
        }else{
            toast.error(data.message)
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const register = async (body) => {
    setLoading(true);
    setError(null);

    const { email, password } = body;
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        toast.success("Success");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    login,
    register,
  };
};

export default useAuth;
