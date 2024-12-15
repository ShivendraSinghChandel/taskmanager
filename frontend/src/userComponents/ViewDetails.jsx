import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewDetails = () => {
  const { id } = useParams();
  const [tasks, setTask] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/task/gettaskbyid?id=${id}`); 
      setTask(response.data);
    };

    fetchData();
  }, [id]);

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <h1>Title: {tasks.title}</h1>
      <p className="description">Description: {tasks.description}</p>
      <div className="meta">
        <span>Due Date: {new Date(tasks.dueDate).toLocaleDateString()}</span>
        <span>Priority: {tasks.priority}</span>
      </div>
      <button className="go-back-button" onClick={() => navigate("/task")}>
        Go Back
      </button>
    </div>
  );
};

export default ViewDetails;
