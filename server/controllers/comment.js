import { createError } from "../error.js";
import Comment from "../models/Comments.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json(`The comment: ${comment.desc} has been deleted`);
    } else {
      next(createError(403, "You can only delete your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

export const editComments = async (req, res, next) => {
  if (req.user.id === req.body.userId) {
    try {
      const editedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          desc: req.body.desc,
        },
        {
          new: true,
        }
      );

      res.status(200).json(editedComment);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your comment!"));
  }
};
