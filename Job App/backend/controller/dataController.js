const dataModel = require('../model/data');

const addData = async (req, res) => {
  const { title, description } = req.body;

  try {
    const data = await dataModel.create({ title, description });
    res.status(201).json({
      success: true,
      message: "Data added successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding data",
      error: error.message
    });
  }
};

const viewData = async (req, res) => {
  try {
    const data = await dataModel.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateData = async (req, res) => {
  try {
    const data = await dataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });    
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data updated successfully", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const data = await dataModel.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addData,
  viewData,
  updateData,
  deleteData,
};
