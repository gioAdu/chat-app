import {
  arrayUnion,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase/config';

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

export const addConversation = async (user2UID, message) => {
  const currentUser = auth.currentUser;

  const sortedUIDs = [currentUser.uid, user2UID].sort();
  const conversationID = sortedUIDs.join('_');

  const conversationRef = doc(db, 'private_chats', conversationID);
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
      senderUIDs: sortedUIDs,
    });
  }
};
