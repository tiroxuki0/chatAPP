import { v4 as uuid } from "uuid";
import { useState, useEffect, useCallback } from "react";
import { storage } from "../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const useUpload = async () => {
  const [url, setUrl] = useState(null);
  const [input, setInput] = useState(null);

  const changeInput = useCallback((i) => {
    setInput(i);
  }, []);

  useEffect(() => {
    const storageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(storageRef, input);

    uploadTask.on(
      /* (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    }, */
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log({ error, message: "storage/unauthorized" });
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log({ error, message: "storage/canceled" });
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            console.log({ error, message: "storage/unknown" });
            break;
        }
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  }, [input]);

  return { url, changeInput };
};

export default useUpload;
