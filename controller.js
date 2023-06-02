const {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
  getLength,
} = require("./model");

function handleGetInfo(req, res) {
  const records = getAllData();
  res.send(
    `Phonebook has info for ${records.length} people <br> <br> ${new Date()}`
  );
}
function handleGetAllData(req, res) {
  console.log("Middleware del Controler");
  const records = getAllData();
  return res.json(records);
}
function handleGetDataById(req, res) {
  const { id } = req.params;
  const record = getDataById(id);

  if (Object.keys(record).length === 0) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
  return res.json(record);
}
function handleDeleteData(req, res) {
  const { id } = req.params;
  deleteData(id);
  return res.json({ message: "Record deleted" });
}
function handleCreateData(req, res) {
  const data = req.body;

  if (!data.name || !data.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  const records = getAllData();
  const existingRecord = records.find((record) => record.name === data.name);

  if (existingRecord) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const record = createData(data);
  return res.status(201).json(record);
}

function handleUpdateData(req, res) {
  const { id } = req.params;
  const data = req.body;
  const record = updateData(id, data);

  if (Object.keys(record).length === 0) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
  return res.json(record);
}

module.exports = {
  handleGetInfo,
  handleGetAllData,
  handleGetDataById,
  handleDeleteData,
  handleCreateData,
  handleUpdateData,
};
