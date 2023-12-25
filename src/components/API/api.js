import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useState, useEffect } from 'react';
import { reauthenticateWithCredential, sendPasswordResetEmail, updatePassword, updateProfile } from 'firebase/auth';

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
 * Custom hook to fetch chat history for the current user.
 * @returns {Object} An object containing the chat history and loading state.
 * @property {Array} chatHistory - The array of chat conversations.
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

          if (!(data.messages.length === 0 && data.sender !== currentUser.uid)) {
            conversations.push(data);
          }
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
      try {
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
      } catch (error) {
        console.error(error);
      }
    }
    // If no message is provided, do nothing
  } else {
    // If the conversation doesn't exist, create a new one
    const newConversationData = {
      userUIDs: sortedUIDs,
      messages: [],
      lastMessage: null,
      lastMsgTimeStamp: null,
      sender: currentUser.uid,
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

    try {
      await setDoc(conversationRef, newConversationData);
    } catch (error) {
      console.error(error);
    }
  }
};

/**
 * Updates the user's display name in the authentication and database.
 * @param {string} firstName - The new first name to update.
 * @returns {Promise<string>} A promise that resolves to a success message when the display name is updated successfully.
 * @throws {Error} If there is an error updating the user's display name.
 */
export const updateUserInfo = async (firstName) => {
  const currentUser = auth.currentUser;

  try {
    await updateProfile(currentUser, {
      displayName: firstName,
    });
  } catch (error) {
    throw error;
  }

  const userDocRef = doc(db, 'Users', currentUser.uid);

  try {
    await updateDoc(userDocRef, { displayName: firstName });
  } catch (dbError) {
    console.error('Error updating user data:', dbError.message);
    // Handle database error
    throw dbError;
  }

  return 'Display name updated successfully';
};

/**
 * Updates the user's password in Firebase authentication.
 * @param {string} newPassword - The new password to update.
 * @returns {Promise<string>} A promise that resolves to a success message when the password is updated successfully.
 * @throws {Error} If there is an error updating the user's password.
 */
export const updateUserPassword = async (newPassword, credentials) => {
  const currentUser = auth.currentUser;

  try {
    await reauthenticateWithCredential(currentUser, credentials);
  } catch (error) {
    console.error('Error in reauthenticateWithCredential:', error);
    throw error;
  }

  try {
    await updatePassword(currentUser, newPassword);
  } catch (error) {
    console.error('Error in updatePassword:', error);
    throw error;
  }

  return 'Password updated successfully';
};

/**
 * Sends a password reset email to the specified email address.
 * @param {string} email - The email address to send the password reset email to.
 * @returns {Promise<string>} A promise that resolves to a success message if the password reset email is sent successfully.
 * @throws {Error} If an error occurs while sending the password reset email.
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return 'Password reset email sent successfully';
};
