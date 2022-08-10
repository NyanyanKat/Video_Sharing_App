import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import http from "../AxiosHook/axiosHook.js";
import { updateCurrentUser } from "firebase/auth";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [comment, setAComment] = useState(undefined);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await http.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async (e) => {
    e.preventDefault();
    await http.post(`/comments`, {
      videoId,
      desc: comment,
    });
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          type="text"
          placeholder="Add a comment..."
          onChange={(e) => setAComment(e.target.value)}
        />
        <Button onClick={handleComment}>Comment</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
