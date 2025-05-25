import express from 'express';
import { createNotes, deleteNotes, getNoteById, getNotes, updateNotes } from '../controller/notesController.js';

const router = express.Router();

router.get("/notes", getNotes)
router.post("/add-notes", createNotes)
router.put("/update-notes/:id",updateNotes)
router.delete("/delete-notes/:id",deleteNotes)
router.get("/getnote-by-id/:id", getNoteById)

export default router;
