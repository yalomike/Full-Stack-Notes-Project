const express = require("express");
const router = express.Router();
const { Notes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  const listOfNotes = await Notes.findAll({ where: { UserId: userId } });
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
  note.UserId = req.user.id;
  await Notes.create(note);
  res.json(note);
});

router.put("/:id", async (req, res) => {
  const noteId = req.params.id;
  const { newTitle, newText } = req.body;
  console.log(req.body);
  const note = await Notes.findByPk(noteId);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  } else {
    await note.update(
      {
        title: newTitle,
        text: newText,
      },
      {
        where: {
          id: noteId,
        },
      }
    );
  }
  res.json(note);
});

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
