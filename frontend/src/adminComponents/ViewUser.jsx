import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
 import {useNavigate} from 'react-router-dom'
 import {message} from 'antd';

const ViewUser = () => {
  const [user, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate=useNavigate();

  useEffect(() => {
    fetchUser();
  }, [currentPage],[]);


  const fetchUser = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/admin/getalluser?page=${currentPage}&limit=10`,
    );
    setUsers(data.users);
    setTotalPages(data.totalPages);
  };


  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.post(`http://localhost:5000/admin/deleteuser`, {
        id:userId
      });
      message.success("User removed");
      fetchUser();
    }
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1); 
  };

  
  

  return (
    <div className="App">
      <h1>Created User</h1>
      <div className="tasks-container">
  <table className="task-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {user
        .map((key) => (
          <tr key={key._id}>
            <td>{key.name}</td>
            <td>{key.email}</td>
            <td>
              <button
                onClick={() => handleDelete(key._id)}
                className={`status-btn`}
              >
                Remove
              </button>
              <button
                onClick={() =>navigate(`addtask/${key._id}`) }
                className="btn-update"
              >
                Assign Task
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

export default ViewUser;