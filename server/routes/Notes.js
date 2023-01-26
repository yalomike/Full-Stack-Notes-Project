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

router.put("/:noteId"),
  async (req, res) => {
    const noteId = req.params;
    console.log(noteId);
    // const { newTitle, newText } = req.body;
    const note = await Notes.findByPk(noteId);
    console.log(note);
    // if (!note) {
    //   return res.status(404).json({ message: "Note not found" });
    // } else {
    //   await note.update(
    //     {
    //       title: newTitle,
    //       text: newText,
    //     },
    //     {
    //       where: { id: noteId },
    //     }
    //   );
    // }
    res.json(note);
  };

router.delete("/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  await Notes.destroy({
    where: {
      id: noteId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;

// router.put("/", validateToken, async (req, res) => {
//   const { title, id } = req.body;
//   // const noteId = req.params.noteId;
//   await Notes.update(
//     { title: title },
//     {
//       where: {
//         id: noteId,
//         title: newTitle,
//         text: newText,
//       },
//     }
//   );

//   res.json("UPDATED SUCCESSFULLY")
