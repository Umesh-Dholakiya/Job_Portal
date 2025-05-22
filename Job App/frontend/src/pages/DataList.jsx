import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DataList = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:9000/data");
    const result = await res.json();
    setData(result);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:9000/data/${id}`, { method: "DELETE" });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Data List</h2>
      <Link to="/adddata" className="btn btn-success mb-3">Add New</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td className="d-flex p-5">
                <Link to={`/edit/${item._id}`} className="btn btn-warning me-2">Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataList;
