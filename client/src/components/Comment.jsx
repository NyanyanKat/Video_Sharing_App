import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import http from "../AxiosHook/axiosHook.js";
import { deleteComment, editComment } from "../redux/commentSlice.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const ButtonDetails = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 90px;
  padding: 5px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-right: 15px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  margin-right: 10px;
  width: 245px;
  display: flex;
`;

const DIV = styled.div`
  display: flex;
`;

const Comment = ({ comment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  // const [deleteComment, setDeleteComment] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.desc);

  useEffect(() => {
    const fetchComment = async () => {
      const res = await http.get(`/users/find/${comment.userId}`);
      setUser(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await http.delete(`/comments/${comment._id}`);
    dispatch(deleteComment(comment));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleEditedComment = async (e) => {
    e.preventDefault();
    await http.put(`/comments/${comment._id}`, {
      userId: comment.userId,
      desc: editedComment,
    });
    dispatch(editComment({ id: comment._id, desc: editedComment }));
    console.log("id:", comment._id);
    console.log("desc", editedComment);
    setIsEdit(false);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  return (
    <Container>
      <Avatar src={user.img} />
      <Details>
        <Name>
          {user.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        {!isEdit ? (
          <>
            <Text>{comment.desc}</Text>
            {currentUser && (
              <>
                {currentUser._id === comment.userId && (
                  <ButtonDetails>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                  </ButtonDetails>
                )}
              </>
            )}
          </>
        ) : (
          <DIV>
            <Input
              type="text"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <Button onClick={handleEditedComment}>Comment</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </DIV>
        )}
      </Details>
    </Container>
  );
};

export default Comment;
