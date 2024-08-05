import React, { useEffect, useState } from "react";
import "./App.css";
import TaskCalendar from "./pages/calendar/TaskCalendar";
import Navbar from "./component/navbar/Navbar";
import TaskModal from "./component/modal/TaskModal.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCalendar from "./hooks/useCalendar.js";
import moment from "moment";
import Login from "./pages/auth/Login.js";
import useAuth from "./hooks/useAuth.js";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const { loading, error, create_contact, data, update_task } = useCalendar();
  const {login} = useAuth()
  

  useEffect(() => {
    setEvents([]);
    if (data && data.length) {
      data.map((val) => {
        const {
          _id,
          start_date,
          end_date,
          description,
          isCompleted,
          isDeleted,
        } = val;
        if (!isDeleted) {
          setEvents((prev) => [
            ...prev,
            {
              id: _id,
              start: moment(start_date).toDate(),
              end: moment(end_date).toDate(),
              title: description,
              isCompleted,
              isDeleted,
            },
          ]);
        }
      });
    }
  }, [data]);

  const handleLogin = (user) => {
    login(user, setIsLoggedIn,setUsername)
  };

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitTask = (taskData) => {
    create_contact(taskData);
  };

  const handleUpdateTask = (id, taskData) => {
    update_task(id, taskData);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin}/>
      ) : (
        <>
          <ToastContainer />
          <Navbar username={username} onCreateTask={handleCreateTask} setIsLoggedIn={setIsLoggedIn}/>
          <TaskCalendar
            events={events}
            setEvents={setEvents}
            onSubmit={handleUpdateTask}
          />
          <TaskModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmitTask}
          />
        </>
      )}
    </div>
  );
}

export default App;
