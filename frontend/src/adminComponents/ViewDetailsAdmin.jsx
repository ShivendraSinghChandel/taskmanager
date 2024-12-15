import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ViewDetails.css";

const ViewDetailsAdmin = () => {
  const { id } = useParams();
  const [tasks, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id)
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/task/gettaskbyid?id=${id}`);
        setTask(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!tasks) {
    return <div>Loading...</div>;
  }


  return (
    <div className="details-containers">
      <div className="card">
        <h1 className="task-title">Title : {tasks.title}</h1>
        <p className="description">Description : {tasks.description}</p>
        <div className="meta">
          <span><strong>Due Date:</strong> {new Date(tasks.dueDate).toLocaleDateString()}</span>
          <span><strong>Priority:</strong> {tasks.priority}</span>
        </div>
        <div className="user-info">
          <h3>Assigned User</h3>
          <p><strong>Name:</strong> {tasks.assignedTo.name || "N/A"}</p>
          <p><strong>Email:</strong> {tasks.assignedTo.email || "N/A"}</p>
        </div>
        <button className="go-back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewDetailsAdmin;
