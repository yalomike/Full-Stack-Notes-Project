// INITIAL SETTING

const express = require("express");
const app = express();
const cors = require("cors");

// EXPRESS & CORS

app.use(express.json());
app.use(cors());

const db = require("./models");

// ROUTES

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const notesRouter = require("./routes/Notes");
app.use("/notes", notesRouter);

// SEQUELIZE

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
