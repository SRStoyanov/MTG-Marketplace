// src/firebaseUtils.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchMTGCards = async () => {
  try {
    const cardsCollection = collection(db, "mtg-cards");
    const cardsSnapshot = await getDocs(cardsCollection);
    return cardsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching MTG cards:", error);
    return [];
  }
};
