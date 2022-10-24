/* AUTH SERVICES */
import { v4 as uuid } from "uuid";
import { auth, db, storage } from "./config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const normalSignIn = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return { code: 1, message: "Signin successful!", user };
    })
    .catch((error) => {
      return { code: 0, message: "Signin failed!", error };
    });
  return result;
};

const createUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return { code: 1, message: "Create successful!", user };
    })
    .catch((error) => {
      return { code: 0, message: "Create failed!", error };
    });
  return result;
};

const fbSignIn = async () => {
  const result = await signInWithPopup(auth, facebookProvider)
    .then((data) => {
      return { code: 1, message: "Signin successful!", data };
    })
    .catch((error) => {
      return { code: 0, message: "Signin failed!", error };
    });
  return result;
};

const ggSignIn = async () => {
  const result = await signInWithPopup(auth, googleProvider)
    .then((data) => {
      return { code: 1, message: "Signin successful!", data };
    })
    .catch((error) => {
      return { code: 0, message: "Signin failed!", error };
    });
  return result;
};

const firebaseSignOut = async () => {
  const result = await signOut(auth)
    .then(() => {
      // Sign-out successful.
      return { code: 1, message: "Sign out successful!" };
    })
    .catch((error) => {
      // An error happened.
      return { code: 0, message: error };
    });
  return result;
};

/* USER SERVICES */

const checkExist = async (collectionName, conditions) => {
  try {
    const { field, operator, value } = conditions;
    const collectionRef = await collection(db, collectionName);
    // Create a query against the collection.
    const q = await query(collectionRef, where(field, operator, value));
    const querySnapshot = await getDocs(q);
    let resultQuery = [];
    querySnapshot.forEach((doc) => {
      resultQuery.push({ id: doc.id, ...doc.data() });
    });
    const name =
      conditions.field.charAt(0).toUpperCase() + conditions.field.slice(1);
    if (resultQuery.length !== 0) {
      return {
        code: 0,
        message: `${name} already exists!`,
        data: resultQuery[0],
      };
    } else {
      return {
        code: 1,
        message: `${name} is new!`,
      };
    }
  } catch (err) {
    return {
      code: 0,
      message: `Something went wrong!`,
      err,
    };
  }
};

const addDocument = async (collectionName, data, conditions) => {
  try {
    // Add a new document with a generated id.
    let snapDoc = null;
    let docRef = null;
    if (conditions) {
      const res = await checkExist(collectionName, conditions);
      if (res.code === 0) {
        return { code: 0, message: res.message };
      }
      const time = await serverTimestamp();
      docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: time,
      });
      snapDoc = await getDoc(docRef);
    } else {
      const time = await serverTimestamp();
      docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: time,
      });
      snapDoc = await getDoc(docRef);
    }
    return {
      code: 1,
      message: `Add ${collectionName.slice(0, -1)} successful!`,
      data: snapDoc.data(),
      docId: docRef.id,
    };
  } catch (err) {
    return { code: 0, err };
  }
};

const getAllDocs = async (collectionName) => {
  let data = [];
  const ref = await collection(db, collectionName);
  const querySnapshot = await getDocs(ref);
  await querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

const updateMemberInRoom = async (collectionName, data, id) => {
  try {
    const collectionRef = doc(db, collectionName, id);
    await updateDoc(collectionRef, {
      members: data,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateMemberInSeen = async (collectionName, data, id) => {
  try {
    /* update seen of last massage */
    const collectionRef = await doc(db, collectionName, id);
    const dataRef = await (await getDoc(collectionRef)).data();
    if (dataRef.uid !== data) {
      await updateDoc(collectionRef, {
        seen: arrayUnion(data),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateDocument = async (collectionName, updateOptions, id) => {
  try {
    const collectionRef = doc(db, collectionName, id);
    await updateDoc(collectionRef, updateOptions);
    return { code: 1 };
  } catch (err) {
    console.log(err);
  }
};

export {
  updateDocument,
  fbSignIn,
  ggSignIn,
  normalSignIn,
  createUser,
  checkExist,
  firebaseSignOut,
  addDocument,
  getAllDocs,
  updateMemberInRoom,
  updateMemberInSeen,
};
