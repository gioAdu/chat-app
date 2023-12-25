import { render, screen } from '@testing-library/react';
import { chatMessages, generateChatList } from '@/components/helpers/UIHelper/ChatMessageComponents';
import { auth } from '@/components/firebase/config';
import '@testing-library/jest-dom';

jest.mock('../../components/firebase/Config', () => ({
  auth: {
    currentUser: {
      uid: 'testUserId',
    },
  },
}));

describe('ChatMessageComponents', () => {
  const chatHistory = [
    {
      id: 'chat1',
      userUIDs: ['testUserId', 'user2'],
      lastMsgTimeStamp: 2,
      messages: [
        { content: 'Hello', senderUID: 'testUserId', timeStamp: new Date() },
        { content: 'Hi', senderUID: 'user2', timeStamp: new Date() },
      ],
    },
    {
      id: 'chat2',
      userUIDs: ['testUserId', 'user3'],
      lastMsgTimeStamp: 1,
    },
  ];

  const users = [
    { uid: 'user2', displayName: 'User Two' },
    { uid: 'user3', displayName: 'User Three' },
  ];

  const handleClick = jest.fn();

  it('generateChatList filters and sorts chat history correctly', () => {
    const result = generateChatList(chatHistory, users, handleClick, 'Two');
    render(result);
    expect(screen.getByText('User Two')).toBeInTheDocument();
  });

  it('chatMessages identifies outgoing and incoming messages correctly', () => {
    const { container } = render(chatMessages(chatHistory, 'user2', null));
    expect(container.textContent).toContain('Hello');
    expect(container.textContent).toContain('Hi');
  });
});
