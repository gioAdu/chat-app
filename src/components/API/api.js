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

  const q = query(privateChatRef, where('userUIDs', 'array-contains', currentUser.uid));

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
 * If the conversation already exists, appends a message to the existing conversation.
 * If the conversation doesn't exist, creates a new conversation.
 * @param {string} user2UID - The UID of the second user in the conversation.
 * @param {string|null} message - The message to be added to the conversation. If null, no message will be added.
 * @returns {Promise<void>} - A promise that resolves when the conversation is added or updated.
 */
export const addConversation = async (user2UID, message = null) => {
  const currentUser = auth.currentUser;

  const sortedUIDs = [currentUser.uid, user2UID].sort();
  const conversationID = sortedUIDs.join('_');

  const conversationRef = doc(db, 'private chat', conversationID);
  const conversationSnap = await getDoc(conversationRef);

  if (conversationSnap.exists()) {
    // If the conversation exists
    if (message) {
      // If a message is provided, append the message to the messages array
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
    }
    // If no message is provided, do nothing
  } else {
    // If the conversation doesn't exist, create a new one
    const newConversationData = {
      userUIDs: sortedUIDs,
      messages: [],
      lastMessage: null,
      lastMsgTimeStamp: null,
    };
    if (message) {
      newConversationData.messages.push({
        content: message,
        timeStamp: Date.now(),
        senderUID: currentUser.uid,
      });
      newConversationData.lastMessage = message;
      newConversationData.lastMsgTimeStamp = Date.now();
    }
    await setDoc(conversationRef, newConversationData);
  }
};
