import { useState, useEffect } from "react";
import api from "../services/api";

import "./Home.css";
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };
  const toggle = async (id, completed) => {
    await api.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="home-container">
      <h2>
        Your Tasks{" "}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </h2>

      <div className="task-input">
        <input
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t._id} className={t.completed ? "done" : ""}>
            <span onClick={() => toggle(t._id, t.completed)}>{t.title}</span>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
