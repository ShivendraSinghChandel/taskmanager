import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatingTask=()=>{

    const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [dueDate, setDueDate] = useState("");
      const [priority,setPriority]=useState("");

      const {id}=useParams();
      const navigate=useNavigate();

      useEffect(()=>{
          const fetchData=async()=>{
            const data=await axios.get(`http://localhost:5000/task/gettaskbyid?id=${id}`);
            setTitle(data.data.title);
            setDescription(data.data.description);
            setDueDate(data.data.dueDate);
            setPriority(data.data.priority);
          }
          fetchData();
      },[id])


    const handleUpdateSave=async(e)=>{
        e.preventDefault();
        await axios.post(
            `http://localhost:5000/task/updatetask`,
            { title, description, dueDate,priority,id }
          );
        message.success("task updated");
        navigate(-1);
      }


    return (
        <>
        <div className="App">
      <h1>Update Task</h1>
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
       <button type="submit" onClick={handleUpdateSave} className="btn-add">Update Task</button>
      </div>
      </div>
        </>
    )
}

export default UpdatingTask;