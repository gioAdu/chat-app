import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
const [currentSection, setCurrentSection] = useState('profile');
const [selectedChat, setSelectedChat] = useState(null);

const { pathname, query } = router;
const { section, chatId } = query;



  return <Layout currentSection={currentSection} selectedChat={selectedChat} />;
}
