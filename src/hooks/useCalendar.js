import { useEffect, useState } from "react";
import { toast } from "react-toastify";

let url = "http://localhost:4001/api/calendar";
let token = localStorage.getItem('token')

const useCalendar = (setEvents) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([])

  useEffect(() => {
    get_tasks()
  }, [])

  const get_tasks = async () => {
    setLoading(true);
    setError(null);

    fetch(`${url}/getTask`, {
      headers: {
        "Authorization": `${token}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.success){
            setData(response.result)
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const create_contact = async (body) => {
    setLoading(true);
    setError(null);
    fetch(`${url}/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then(data => {
        if(data.success){
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        get_tasks()
      });
  };

  const update_task = async (id,body) => {
    setLoading(true);
    setError(null);

    fetch(`${url}/updateTask/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.success){
          toast.success(response.message)
        }else{
          toast.error(response.message)
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        get_tasks()
      });
  };


  return {
    loading,
    error,
    data,
    create_contact,
    update_task
  };
};

export default useCalendar;