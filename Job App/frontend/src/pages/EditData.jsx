import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditData = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`http://localhost:9000/data/${id}`);
      const result = await res.json();

      setTitle(result.title);
      setDescription(result.description);
    };
    fetchItem();
  }, [id]);

  const handleForm = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:9000/data/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });
    navigate("/");
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
    </div>
  );
};

export default EditData;
