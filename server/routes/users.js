import express from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unSubscribeUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifyToken, updateUser);

//DELETE USER
router.delete("/:id", verifyToken, deleteUser);

//GET A USER
router.get("/find/:id", getUser);

//SUBSCRIBE A USER
router.put("/sub/:id", verifyToken, subscribeUser);

//UNSUBSCRIBE A USER
router.put("/unsub/:id", verifyToken, unSubscribeUser);

//LIKE A VIDEO
router.put("/like/:videoId", verifyToken, likeVideo);

//DISLIKE A VIDEO
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
