const express = require("express");
const router = express.Router();
const { Notes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfNotes = await Notes.findAll();
  res.json(listOfNotes);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const note = await Notes.findByPk(id);
  res.json(note);
});

router.post("/", validateToken, async (req, res) => {
  const note = req.body;
  const username = req.user.username;
  note.username = username;
  await Notes.create(note);
  res.json(note);
});

router.put("/title"),
  validateToken,
  async (req, res) => {
    const { newTitle, id } = req.body;
    await Notes.update({ title: newTitle }, { where: { id: id } });
    res.json(newTitle);
  };

router.put("/text"),
  validateToken,
  async (req, res) => {
    const { newText, id } = req.body;
    await Notes.update({ noteText: newText }, { where: { id: id } });
    res.json(newText);
  };

router.delete("/:noteId", validateToken, async (req, res) => {
  const noteId = req.params.noteId;

  await Notes.destroy({
    where: {
      id: noteId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
