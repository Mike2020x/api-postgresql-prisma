const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 3001;

const {
  handleGetAllData,
  handleGetInfo,
  handleGetDataById,
  handleDeleteData,
  handleCreateData,
  handleUpdateData,
} = require("./controller");
//midlewares
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

//get info
app.get("/info", handleGetInfo);
//get persons
app.get("/api/persons", handleGetAllData);
//get person
app.get("/api/persons/:id", handleGetDataById);
//delete person
app.delete("/api/persons/:id", handleDeleteData);
//add person
app.post("/api/persons", handleCreateData);

app.patch("/api/persons/:id", handleUpdateData);

app.listen(port, () => console.log(`App listening on port ${port}!`));
