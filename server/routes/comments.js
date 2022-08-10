import express from "express";
import {
  addComment,
  deleteComment,
  editComments,
  getComments,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);
router.put("/:id", verifyToken, editComments);

export default router;
