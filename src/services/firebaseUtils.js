// src/services/firebaseUtils.js
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export const fetchMTGCards = async (activeFilter, user) => {
  try {
    const cardsCollection = collection(db, "mtg-cards");
    const cardsSnapshot = await getDocs(cardsCollection);

    const cardsData = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sorting cards by createdAt in descending order
    const sortedCards = cardsData.sort((a, b) => b.createdAt - a.createdAt);

    if (activeFilter === "mySales") {
      return sortedCards.filter((card) => card.sellerId === user.uid);
    } else if (activeFilter === "myBuys") {
      return sortedCards.filter((card) => card.buyerId === user.uid);
    } else {
      return sortedCards;
    }
  } catch (error) {
    console.error("Error fetching MTG cards:", error);
    return [];
  }
};

export const addMTGCard = async (cardData) => {
  try {
    const cardRef = await addDoc(collection(db, "mtg-cards"), {
      ...cardData,
      createdAt: serverTimestamp(),
    });
    console.log("Card added with ID: ", cardRef.id);
    return cardRef.id;
  } catch (error) {
    console.error("Error adding card:", error);
    throw error;
  }
};

export const editMTGCard = async (cardId, updatedData) => {
  try {
    const cardRef = doc(db, "mtg-cards", cardId);
    await updateDoc(cardRef, updatedData);
    console.log("Card updated successfully");
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
};

export const deleteMTGCard = async (cardId, userId) => {
  try {
    // Retrieve the card document
    const cardRef = doc(db, "mtg-cards", cardId);
    const cardSnapshot = await getDoc(cardRef);

    // Check if the user is the creator of the card
    if (cardSnapshot.exists() && cardSnapshot.data().sellerId === userId) {
      // If so, proceed with deletion
      await deleteDoc(cardRef);
      console.log("Card deleted successfully");
    } else {
      console.error("User does not have permission to delete this card");
      throw new Error("Insufficient permissions");
    }
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
};

export const buyMTGCard = async (cardId, buyerId) => {
  try {
    const cardRef = doc(db, "mtg-cards", cardId);
    await updateDoc(cardRef, {
      isBought: true,
      buyerId: buyerId,
      boughtAt: serverTimestamp(),
    });
    console.log(`Card with ID ${cardId} bought by user with ID ${buyerId}`);
  } catch (error) {
    console.error("Error buying card:", error);
    throw error;
  }
};
