import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div``;

const LogOut = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  return <Container>

  </Container>;
};

export default LogOut;
