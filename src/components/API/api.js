import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { auth } from '../firebase/config';

const db = getFirestore();

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
 * Retrieves the conversation data for the current user.
 * @returns {Promise<void>} A promise that resolves when the conversation data is retrieved.
 */
export const getchatHistory = async () => {
  const currentUser = auth.currentUser;
  const privateChatRef = collection(db, 'private chat');

  const q = query(
    privateChatRef,
    where('userUIDs', 'array-contains', currentUser.uid)
  );

  const querySnapshot = await getDocs(q);

  const conversations = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    conversations.push(data);
  });

  return conversations;
};

export const addConversation = async (user2UID, message) => {};
