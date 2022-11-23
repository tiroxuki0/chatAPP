import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRegisterInfo } from "../../../redux/authSlice";
import { registerRequest } from "../../../redux/authRequest";
import { updateUserStatus } from "../../../firebase/services";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register = useSelector((state) => state.auth.register);
  const [loading, setLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  React.useEffect(() => {
    if (!register) {
      navigate("/auth/sign-in");
    }
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      dispatch(
        setRegisterInfo({ ...register, photoURL: avatars[selectedAvatar] })
      );
      await registerRequest(dispatch, navigate, {
        ...register,
        photoURL: avatars[selectedAvatar],
      });
      updateUserStatus();
    }
  };

  const getAvatars = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}/?apikey=lyjRWY9qwm7VBD`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setLoading(false);
  };
  useEffect(() => {
    getAvatars();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Box sx={{ height: 40 }}>
          <CircularProgress sx={{ color: "#fff" }} />
          <h2 style={{ color: "white" }}>Please wait a few second</h2>
        </Box>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  height: 100%;
  width: 100%;

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    gap: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4eac6d;
    }
  }
  .submit-btn {
    background-color: #4eac6d;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4eac6d;
    }
  }
`;
