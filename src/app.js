const express = require("express");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(express.json());

app.use("/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Secure Notes API");
});

module.exports = app;