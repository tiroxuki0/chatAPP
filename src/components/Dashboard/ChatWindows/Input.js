import React from "react";
import styled from "styled-components";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Container from "@mui/material/Container";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ToastContainer, toast } from "react-toastify";
import { addDocument } from "../../../firebase/services";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { storage } from "../../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: auto;
  padding: 6px 15px;
  border-radius: 0px 0px 6px 6px;
`;

const Preview = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 115px;
  transform: translateY(-105%);
  padding: 15px 15px 0px 15px;
  background: rgba(255, 255, 255, 0.05) !important;
  border-top: 1px solid #d2d2d2;
  backdrop-filter: blur(5px);
  .container {
    height: 100%;
    width: auto;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .pictureContainer {
    height: 100%;
    width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: contain;
    position: relative;
  }
  .picture {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    padding: 0;
  }
`;

const ContainerInput = styled(Container)`
  height: 100%;
`;

const FormStyled = styled.form`
  position: relative;
  display: flex !important;
  align-items: center;
  flex-direction: row !important;
  justify-content: space-between;
  border-radius: 5px;
  gap: 5px;
  .input_area {
    resize: none;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media only screen and (max-width: 400px) {
    .input_area {
      padding: 12px 0px;
    }
  }
`;

const TextareaAutosizeStyled = styled(TextareaAutosize)`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  outline: none;
  background: transparent;
  padding: 16.5px 0;
  color: #797c8c;
`;

const PickerWrapper = styled.div`
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  transform: translate(4%, -100%);
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease;
  em-emoji-picker {
    height: 320px;
    min-height: 320px;
  }
  &.enable {
    visibility: visible;
    opacity: 1;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(100%);
    width: 100%;
    height: 15px;
    background: transparent;
  }
`;

const WindowsInput = () => {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.auth.theme);
  const roomSelected = useSelector((state) => state.data.roomSelected);
  const btnPickerRef = React.useRef(null);
  const pickerRef = React.useRef(null);
  const [message, setMessage] = React.useState("");
  const [selectedImgs, setSelectedImgs] = React.useState([]);
  const [imgs, setImgs] = React.useState([]);
  const imgsRef = React.useRef([]);
  const urls = React.useRef([]);

  const toastOptions = {
    position: "top-center",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: theme ? "light" : "dark",
  };

  React.useEffect(() => {
    btnPickerRef.current.addEventListener("mouseover", () => {
      pickerRef.current.classList.add("enable");
    });
    pickerRef.current.addEventListener("mouseover", (e) => {
      e.currentTarget.classList.add("enable");
    });

    btnPickerRef.current.addEventListener("mouseleave", () => {
      pickerRef.current.classList.remove("enable");
    });

    pickerRef.current.addEventListener("mouseleave", (e) => {
      e.currentTarget.classList.remove("enable");
    });
  }, []);

  const sendMessage = () => {
    if (selectedImgs.length > 0) {
      /*  */
      const uploads = selectedImgs.map((item, index) => {
        const storageRef = ref(
          storage,
          `message/image/${item.file.name + " " + uuid()}`
        );

        const uploadTask = uploadBytesResumable(storageRef, item.file);

        return uploadTask;
      });

      Promise.all(uploads).then(function (values) {
        const urls = [];
        values.forEach((upload) => {
          const url = getDownloadURL(upload.task.snapshot.ref);
          urls.push(url);
        });
        Promise.all(urls).then(function (values) {
          console.log(values);
          addDocument("messages", {
            type: "image",
            text: values,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            roomId: roomSelected.id,
            seen: [],
          });
          if (message.trim()) {
            addDocument("messages", {
              type: "text",
              text: message,
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
              roomId: roomSelected.id,
              seen: [],
            });
            setMessage("");
          }
        });
      });
      /*  */
    } else {
      if (message.trim()) {
        addDocument("messages", {
          type: "text",
          text: message,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          roomId: roomSelected.id,
          seen: [],
        });
        setMessage("");
      }
    }
    setSelectedImgs([]);
    setImgs([]);
    imgsRef.current = [];
    urls.current = [];
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleCreateBase64 = React.useCallback(async (e) => {
    const files = e.target.files;
    const newFiles = [...files].map((file) => {
      return { id: uuid(), file };
    });
    let imgsBase64 = [];
    imgsRef.current = [...imgsRef.current, ...newFiles];
    setSelectedImgs(imgsRef.current);
    for (let i = 0; i < newFiles.length; i++) {
      const base64 = await convertToBase64(newFiles[i].file);
      imgsBase64 = [...imgsBase64, { id: newFiles[i].id, src: base64 }];
    }
    setImgs((prev) => [...prev, ...imgsBase64]);
    e.target.value = "";
    /* if ([...imgsRef.current, ...files].length < 16) {
    } else {
      toast.info("You can only send 15 images at a time", toastOptions);
    } */
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

  const deleteImage = (img) => {
    imgsRef.current = imgsRef.current.filter((e) => e.id !== img.id);
    setSelectedImgs(imgsRef.current);
    setImgs((prev) => prev.filter((e) => e.id !== img.id));
  };

  return (
    <Wrapper
      style={{
        background: theme ? "#ededed" : "#2e2e2e",
        borderTop: theme ? "1px solid #d5d5d5" : "1px solid #333",
      }}
    >
      {imgs.length > 0 && (
        <Preview>
          <div className="container">
            {imgs.map((img, index) => {
              return (
                <div key={index} className="pictureContainer">
                  <CancelIcon
                    className="close"
                    sx={{
                      color: "#797c8c",
                      width: 25,
                      height: 25,
                      cursor: "pointer",
                    }}
                    onClick={() => deleteImage(img)}
                  />
                  <img className="picture" src={img.src} alt="logo" />
                </div>
              );
            })}
          </div>
        </Preview>
      )}
      <ContainerInput disableGutters>
        <FormStyled onSubmit={handleSendMessage}>
          <Button
            sx={{ minWidth: 20 }}
            aria-label="upload picture"
            component="label"
          >
            <AttachFileIcon
              sx={{
                color: "#797c8c",
                width: 25,
                height: 25,
                transform: "rotate(45deg)",
              }}
            />
            <input
              hidden
              accept="image/*, png, jpg, jpeg"
              type="file"
              multiple
              onChange={handleCreateBase64}
            />
          </Button>
          <TextareaAutosizeStyled
            className="input_area"
            id="message_text"
            fullWidth
            maxRows={4}
            placeholder="Message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={onEnterPress}
            value={message}
          />
          <Button ref={btnPickerRef} sx={{ minWidth: 20 }}>
            <SentimentSatisfiedAltIcon
              sx={{ color: "#797c8c", width: 25, height: 25 }}
            />
          </Button>
          <PickerWrapper ref={pickerRef}>
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              perLine={8}
              previewPosition="none"
              maxFrequentRows={1}
              emojiSize={20}
              emojiButtonSize={30}
              theme={theme ? "light" : "dark"}
            />
          </PickerWrapper>
          <Button sx={{ minWidth: 20 }} type="submit">
            <SendIcon sx={{ color: "#797c8c", width: 25, height: 25 }} />
          </Button>
        </FormStyled>
      </ContainerInput>
      <ToastContainer />
    </Wrapper>
  );
};

export default React.memo(WindowsInput);
