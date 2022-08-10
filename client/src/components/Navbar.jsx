import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import UploadIcon from "@mui/icons-material/Upload";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
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

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-right: 15px;
  /* padding: 20px; */
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  margin-left: 10px;
`;

const Icon = styled.div`
  cursor: pointer;
  margin: 10px;
`;

const Navbar = () => {
  //Open OR Close video upload page
  const [open, setOpen] = useState(false);

  //Search Query (q)
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  // const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/search?q=${q}`)}
            />
          </Search>
          {currentUser ? (
            <User>
              <Icon>
                <UploadOutlinedIcon onClick={() => setOpen(true)} />
              </Icon>
              <Icon>
                <NotificationsNoneIcon />
              </Icon>
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
