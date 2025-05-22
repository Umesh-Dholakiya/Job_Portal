import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataList from "./pages/DataList";
import AddData from "./pages/AddData";
import EditData from "./pages/EditData";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/adddata" element={<AddData />} />
        <Route path="/edit/:id" element={<EditData />} />
      </Routes>
    </Router>
  );
}

export default App;
