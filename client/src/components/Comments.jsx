import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import http from "../AxiosHook/axiosHook.js";
import { updateCurrentUser } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchSuccess } from "../redux/commentSlice.js";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 40%;
`;

const NotSignedIn = styled.p`
  margin-top: 25px;
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
  const { currentComments } = useSelector((state) => state.comment);

  const dispatch = useDispatch();

  // const [comments, setComments] = useState([]);
  const [comment, setAComment] = useState(undefined);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await http.get(`/comments/${videoId}`);
        // setComments(res.data);
        dispatch(fetchSuccess(res.data));
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async (e) => {
    e.preventDefault();
    const oneComment = await http.post(`/comments`, {
      videoId,
      desc: comment,
    });
    dispatch(addComment(oneComment.data));
  };

  return (
    <Container>
      {currentUser ? (
        <>
          <NewComment>
            <Avatar src={currentUser.img} />
            <Input
              type="text"
              placeholder="Add a comment..."
              onChange={(e) => setAComment(e.target.value)}
            />
            <Button onClick={handleComment}>Comment</Button>
          </NewComment>
        </>
      ) : (
        <>
          <NotSignedIn>Please Sign In To Comment</NotSignedIn>
          <hr />
        </>
      )}

      {currentComments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
