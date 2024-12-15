import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddTask=()=>{

      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [dueDate, setDueDate] = useState("");
      const [priority, setPriority] = useState("low");
      const {id}=useParams();
      const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
          "http://localhost:5000/task/settask",
          { title, description, dueDate, priority ,id},
        );
        setTitle('');
        setDescription('')
        setDueDate('')
        setPriority('')
        message.success("task assigned");
        navigate(-1);
      };


    return (
        <>
        <div className="App">
      <h1>Assign Task</h1>
           <div  className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-description"
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input-date"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input-priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" className="btn-add" onClick={handleSubmit}>Assign Task</button>
      </div>
      </div>
        </>
    )
}

export default AddTask;