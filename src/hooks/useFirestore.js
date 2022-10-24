import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";

const useFirestore = (collectionName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef, orderBy("createdAt"));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      try {
        let dataQuery = [];
        await querySnapshot.forEach((doc) => {
          dataQuery.push({ id: doc.id, ...doc.data() });
        });
        if (dataQuery.length !== 0) {
          setData(dataQuery);
        }
      } catch (err) {
        console.log(err);
      }
    });
    return () => {
      unsub();
    };
  }, [collectionName]);

  return data;
};

export default useFirestore;
