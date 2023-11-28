import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useState, useEffect } from 'react';

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of user objects.
 */
export const getAllUsers = async () => {
  const usersCollection = collection(db, 'Users');
  const userSnapshot = await getDocs(usersCollection);
  const usersList = userSnapshot.docs.map((doc) => doc.data());

  return usersList;
};

/**
 * Custom hook to fetch chat history from Firestore.
 * @returns {Object} An object containing the chat history and loading state.
 * @property {Array.<Object>} chatHistory - The array of chat history.
 * @property {boolean} isLoading - The loading state indicating if the chat history is being fetched.
 */
export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = auth.currentUser;
  const privateChatRef = collection(db, 'private chat');

  const q = query(
    privateChatRef,
    where('userUIDs', 'array-contains', currentUser.uid)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          conversations.push(data);
        });
        setChatHistory(conversations);
        setIsLoading(false);
      },
      (error) => {
        console.log('Error getting document:', error);
        setIsLoading(false);
      }
    );

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs once on mount

  return { chatHistory, isLoading };
};

/**
 * Adds a conversation to the database.
 * @param {string} user2UID - The UID of the second user in the conversation.
 * @param {string} message - The message content to be added to the conversation.
 * @returns {Promise<void>} - A promise that resolves when the conversation is added to the database.
 */
export const addConversation = async (user2UID, message) => {
  const currentUser = auth.currentUser;

  const sortedUIDs = [currentUser.uid, user2UID].sort();
  const conversationID = sortedUIDs.join('_');

  const conversationRef = doc(db, 'private chat', conversationID);
  const conversationSnap = await getDoc(conversationRef);

  if (conversationSnap.exists()) {
    // If the conversation exists, append the message to the messages array
    await setDoc(
      conversationRef,
      {
        messages: arrayUnion({
          content: message,
          timeStamp: Date.now(),
          senderUID: currentUser.uid,
        }),
        lastMessage: message,
        lastMsgTimeStamp: Date.now(),
      },
      { merge: true }
    );
  } else {
    // If the conversation doesn't exist, create a new one
    await setDoc(conversationRef, {
      lastMessage: message,
      lastMsgTimeStamp: Date.now(),
      messages: [
        {
          content: message,
          timeStamp: Date.now(),
          senderUID: currentUser.uid,
        },
      ],
      userUIDs: sortedUIDs,
    });
  }
};
