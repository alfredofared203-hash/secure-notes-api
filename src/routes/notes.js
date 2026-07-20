const express = require("express");
const router = express.Router();

const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

// GET جميع الملاحظات
router.get("/", getAllNotes);

// GET ملاحظة واحدة
router.get("/:id", getNoteById);

// إنشاء ملاحظة
router.post("/", createNote);

// تعديل ملاحظة
router.put("/:id", updateNote);

// حذف ملاحظة
router.delete("/:id", deleteNote);

module.exports = router;