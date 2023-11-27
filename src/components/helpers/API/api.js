import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { auth } from '../firebase/config';

const db = getFirestore();

export const getAllUsers = async () => {
  const usersCollection = collection(db, 'Users');
  const userSnapshot = await getDocs(usersCollection);
  const usersList = userSnapshot.docs.map((doc) => doc.data());

  return usersList;
};

export const getConversation = async () => {
  const currentUser = auth.currentUser;
  const privateChatRef = collection(db, 'private chat');

  const q = query(
    privateChatRef,
    where('userUIDs', 'array-contains', currentUser.uid)
  );

  const querySnapshot = await getDocs(q);

  const conversations = [];

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    conversations.push(doc.data());
  });

  console.log(conversations);
};
