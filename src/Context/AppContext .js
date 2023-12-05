import React, { createContext, useContext, useState } from 'react';
import Head from 'next/head';

// Create a context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [title, setTitle] = useState('Chat app');
  const [selectedChat, setSelectedChat] = useState(null);

  const [description, setDescription] = useState(
    'Welcome to Chat App, a real-time messaging platform that connects you with people around the world. Sign in or sign up to start chatting!'
  );

  return (
    <AppContext.Provider value={{ setTitle, setDescription,   selectedChat,setSelectedChat}}>
      <Head>
        <title>{`Chat App | ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCtx = () => useContext(AppContext);
