import { render, act } from '@testing-library/react';
import { AppProvider, useCtx } from '@/Context/AppContext';

describe('AppProvider and useCtx', () => {
  it('provides the correct initial state', () => {
    let result;
    function TestComponent() {
      result = useCtx();
      return null;
    }

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(result.title).toBe('Welcome');
    expect(result.description).toBe(
      'Welcome to Chat App, a real-time messaging platform that connects you with people around the world. Sign in or sign up to start chatting!'
    );
    expect(result.selectedChat).toBeNull();
  });

  it('allows updating the title', () => {
    let result;
    function TestComponent() {
      result = useCtx();
      return null;
    }

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      result.setTitle('New Title');
    });

    expect(result.title).toBe('New Title');
  });
});
