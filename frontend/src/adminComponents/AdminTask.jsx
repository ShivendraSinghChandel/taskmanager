import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
 import {useNavigate} from 'react-router-dom'
 import {message} from 'antd';

const AdminTask = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate=useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);


  const fetchTasks = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/task/getalltask?page=${currentPage}&limit=10`,
    );
    setTasks(data.tasks);
    setTotalPages(data.totalPages);
  };



  const handleStatusChange = async (task) => {
    const taskstatus=task.status==="pending"?"completed":"pending";
    await axios.post(
      `http://localhost:5000/task/updatestatus`,
      { id:task._id,taskstatus },
    );
    message.success("status updated");
    fetchTasks();
  };



  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await axios.post(`http://localhost:5000/task/deletetask`, {
        id:taskId
      });
      message.success("task deleted");
      fetchTasks();
    }
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1); 
  };

  
  

  return (
    <div className="App h-100">
      <h1>Assigned Task</h1>
      <div className="tasks-container">
  <table className="task-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Title</th>
        <th>Due Date</th>
        <th>Priority</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks
        .sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
        .map((task) => (
          <tr key={task._id} className={`priority-${task.priority}`}>
            <td>{task.assignedTo.name}</td>
            <td>{task.assignedTo.email}</td>
            <td>{task.title}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.priority}</td>
            <td>
              <button
                onClick={() => handleStatusChange(task)}
                className={`status-btn ${task.status}`}
              >
                {task.status}
              </button>
            </td>
            <td>
              <button
                onClick={() =>navigate(`updatetask/${task._id}`) }
                className="btn-update"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="btn-delete"
              >
                Delete
              </button>
              <button className="btn-view" onClick={()=>{navigate(`viewdetailadmin/${task._id}`)}}>
                View Details
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

<div className="pagination-container">
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"prev-item"}
        previousLinkClassName={"prev-link"}
        nextClassName={"next-item"}
        nextLinkClassName={"next-link"}
        activeClassName={"active"}
        forcePage={currentPage - 1} 
      />
    </div>
    </div>
  );
};

export default AdminTask;