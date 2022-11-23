import * as React from "react";
import axios from "axios";
import styledd from "styled-components";
import { Buffer } from "buffer";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../../../redux/authSlice";
import { updateDocument } from "../../../firebase/services";
import { v4 as uuid } from "uuid";
import { storage } from "../../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ListHeaderWrapper = styledd.div`
  margin-bottom: 20px;
  height: 25%;
  position: relative;
  z-index: 100;
`;

const AvatarUser = styledd.div`
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translate(-50%,50%);
  position: absolute;
`;

const HeaderInfo = styledd.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonStyled = styledd(IconButton)`
  transition: all 0.3s ease;
  padding: 7px;
  &:hover{
    background #4eac6d !important;
    svg{
      fill: white;
    }
  }
`;

const Container = styledd.div`
  width: 100%;
  min-height: 80px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  background: white;
  padding: 10px 5px;
  .refresh{
    z-index: 10;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(100%, -50%);
  }
  .avatars {
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    .avatar {
      border: 0.2rem solid transparent;
      padding: 0.1rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 2.5rem;
        transition: 0.5s ease-in-out;
      }
      &.selected {
        border: 0.2rem solid #4eac6d;
      }
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

const ListHeader = () => {
  const api = `https://api.multiavatar.com/`;
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.auth.theme);
  const [editBackground, setEditBackground] = React.useState(false);
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [avatars, setAvatars] = React.useState([]);
  const [background, setBackground] = React.useState(user.background);
  const [selectedAvatar, setSelectedAvatar] = React.useState(undefined);
  const backgroundRef = React.useRef();
  const dispatch = useDispatch();

  /* handle background */

  const handleCloseBackground = () => {
    setBackground(user.background);
    setEditBackground(false);
    backgroundRef.current = null;
  };
  const handleSaveBackground = () => {
    console.log(backgroundRef.current);
    const storageRef = ref(
      storage,
      `user/background/${backgroundRef.current.name + " " + uuid()}`
    );

    const uploadTask = uploadBytesResumable(storageRef, backgroundRef.current);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log({ error, message: "storage/unauthorized" });
            break;
          case "storage/canceled":
            console.log({ error, message: "storage/canceled" });
            break;
          case "storage/unknown":
            console.log({ error, message: "storage/unknown" });
            break;
        }
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateDocument(
            "users",
            {
              ...user,
              background: downloadURL,
            },
            user.id
          );
          setEditBackground(false);
        });
      }
    );
  };

  /* end handle background */

  const getAvatars = async () => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}/?apikey=lyjRWY9qwm7VBD`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setLoading(false);
  };

  React.useEffect(() => {
    getAvatars();
  }, []);

  const handleChangeAvatar = (index) => {
    setSelectedAvatar(index);
    if (avatars[index] !== undefined) {
      dispatch(signInSuccess({ ...user, photoURL: avatars[index] }));
    }
  };
  const handleSaveAvatar = () => {
    setEditAvatar(false);
    updateDocument(
      "users",
      {
        ...user,
        photoURL: avatars[selectedAvatar],
      },
      user.id
    );
  };

  const handleCreateBase64 = React.useCallback(async (e) => {
    const file = e.target.files[0];
    backgroundRef.current = e.target.files[0];
    const base64 = await convertToBase64(file);
    setEditBackground(true);
    setBackground(base64);
    e.target.value = "";
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (!file) {
        alert("Please select an image");
      } else {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
      }
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <ListHeaderWrapper
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "-15px",
        padding: "15px",
      }}
    >
      <HeaderInfo>
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            color: theme ? "white" : "rgb(241 241 241)",
            fontWeight: 600,
          }}
        >
          Settings
        </h3>
        {user.providerId == "firebase" ? (
          <>
            {!editBackground ? (
              <Tooltip title="Change Background" placement="right">
                <ButtonStyled
                  sx={{
                    background: theme
                      ? "#edf7f0 !important"
                      : "rgb(85 85 85 / 60%)!important",
                  }}
                  aria-label="set background picture"
                  component="label"
                >
                  <EditIcon
                    sx={{
                      width: 16,
                      height: 16,
                      color: theme ? "#495057" : "#edf7f0",
                    }}
                  />
                  <input
                    hidden
                    accept="image/*, png, jpg, jpeg"
                    type="file"
                    onChange={handleCreateBase64}
                  />
                </ButtonStyled>
              </Tooltip>
            ) : (
              <div style={{ display: "flex", gap: "2px" }}>
                <Tooltip title="Close Edit" placement="bottom">
                  <ButtonStyled
                    sx={{
                      background: theme
                        ? "#edf7f0 !important"
                        : "rgb(85 85 85 / 60%)!important",
                    }}
                    aria-label="set background picture"
                    component="label"
                    onClick={handleCloseBackground}
                  >
                    <CloseIcon
                      sx={{
                        width: 16,
                        height: 16,
                        color: theme ? "#495057" : "#edf7f0",
                      }}
                    />
                  </ButtonStyled>
                </Tooltip>
                <Tooltip title="Save Edit" placement="bottom">
                  <ButtonStyled
                    sx={{
                      background: theme
                        ? "#edf7f0 !important"
                        : "rgb(85 85 85 / 60%)!important",
                    }}
                    aria-label="set background picture"
                    component="label"
                    onClick={handleSaveBackground}
                  >
                    <CheckIcon
                      sx={{
                        width: 16,
                        height: 16,
                        color: theme ? "#495057" : "#edf7f0",
                      }}
                    />
                  </ButtonStyled>
                </Tooltip>
              </div>
            )}
          </>
        ) : (
          <Tooltip title="Cant Change Background" placement="right">
            <ButtonStyled
              disabled={user.providerId == "firebase" ? false : true}
              sx={{
                background: theme
                  ? "#edf7f0 !important"
                  : "rgb(85 85 85 / 60%)!important",
              }}
              aria-label="set background picture"
              component="label"
            >
              <LockIcon
                sx={{
                  width: 16,
                  height: 16,
                  color: theme ? "#495057" : "#edf7f0",
                }}
              />
            </ButtonStyled>
          </Tooltip>
        )}
      </HeaderInfo>
      <AvatarUser className="avataruser">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            !editAvatar ? (
              <Tooltip title="Change Profile Image" placement="right">
                <ButtonStyled
                  disabled={user.providerId == "firebase" ? false : true}
                  onClick={() => setEditAvatar(true)}
                  sx={{
                    background: theme
                      ? "#edf7f0 !important"
                      : "rgb(85 85 85 / 60%)!important",
                  }}
                >
                  {user.providerId == "firebase" ? (
                    <CameraAltIcon
                      sx={{
                        width: 16,
                        height: 16,
                        color: theme ? "#495057" : "#edf7f0",
                      }}
                    />
                  ) : (
                    <LockIcon
                      sx={{
                        width: 16,
                        height: 16,
                        color: theme ? "#495057" : "#edf7f0",
                      }}
                    />
                  )}
                </ButtonStyled>
              </Tooltip>
            ) : (
              <Tooltip title="Save Profile Image" placement="right">
                <ButtonStyled
                  disabled={user.providerId == "firebase" ? false : true}
                  onClick={handleSaveAvatar}
                  sx={{
                    background: theme
                      ? "#edf7f0 !important"
                      : "rgb(85 85 85 / 60%)!important",
                  }}
                >
                  <CheckIcon
                    sx={{
                      width: 16,
                      height: 16,
                      color: theme ? "#495057" : "#edf7f0",
                    }}
                  />
                </ButtonStyled>
              </Tooltip>
            )
          }
        >
          {user.photoURL && user.photoURL.includes("http") ? (
            <Avatar
              alt={user.displayName}
              src={user.photoURL}
              sx={{ width: 85, height: 85, border: "5px solid white" }}
            />
          ) : (
            <Avatar
              alt={user.displayName}
              src={`data:image/svg+xml;base64,${user.photoURL}`}
              sx={{ width: 85, height: 85, border: "5px solid white" }}
            />
          )}
        </Badge>
        {editAvatar && (
          <Container style={{ background: theme ? "white" : "#262626" }}>
            {loading ? (
              <p style={{ color: theme ? "#495057" : "#edf7f0" }}>
                Please wait...
              </p>
            ) : (
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
                        onClick={() => handleChangeAvatar(index)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        )}
      </AvatarUser>
    </ListHeaderWrapper>
  );
};

export default ListHeader;
