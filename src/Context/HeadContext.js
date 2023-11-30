import React, { createContext, useContext, useState } from 'react';
import Head from 'next/head';

// Create a context
const HeadContext = createContext();

// Create a provider component
export const HeadProvider = ({ children }) => {
  const [title, setTitle] = useState('Chat app');
  const [description, setDescription] = useState(
    'Welcome to Chat App, a real-time messaging platform that connects you with people around the world. Sign in or sign up to start chatting!'
  );

  return (
    <HeadContext.Provider value={{ setTitle, setDescription }}>
      <Head>
        <title>{`Chat App | ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </HeadContext.Provider>
  );
};

// Create a custom hook to use the context
export const usePageHead = () => useContext(HeadContext);
