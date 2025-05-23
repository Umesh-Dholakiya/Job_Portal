import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditData = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`http://localhost:9000/data?id=${id}`);
        const result = await res.json();

        const item = result[0];
        if (item) {
          setTitle(item.title);
          setDescription(item.description);
        } else {
          toast.error("Item not found");
        }
      } catch (err) {
        toast.error("Fetch error:", err);
      }
    };
    fetchItem();
  }, [id]);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:9000/data/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Data updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      toast.error("Failed to update data!");
    }
  };


  return (
    <div className="container mt-5">
      <h2>Edit Data</h2>
      <form onSubmit={handleForm}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />

    </div>
  );
};

export default EditData;
