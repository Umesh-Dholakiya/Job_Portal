import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddData = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/data/addData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });


    if (response.ok) {
      toast.success("Data Add successfully!");
      setTimeout(() => navigate("/"), 1500);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Data</h2>
      <form onSubmit={handleForm}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />

    </div>

  );
};

export default AddData;
