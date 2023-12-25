import { render, screen, waitFor } from '@testing-library/react';
import { useCtx } from '@/Context/AppContext';
import { useRouter } from 'next/router';
import '@testing-library/jest-dom';

import SignIn from '@/pages/auth/signin';

// Mock the useCtx hook from AppContext
jest.mock('../../Context/AppContext', () => ({
  useCtx: jest.fn(),
}));

// Mock the useRouter hook from next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock the useTheme hook from next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'light', setTheme: jest.fn() }),
}));

test('renders SignIn component', async () => {
  // Setup mock functions for setTitle and setDescription
  const setTitle = jest.fn();
  const setDescription = jest.fn();

  useRouter.mockReturnValue({
    route: '/auth/signin',
    pathname: '',
    query: '',
    asPath: '',
  });

  // When useCtx is called, return the mock functions
  useCtx.mockReturnValue({ setTitle, setDescription });

  // Render the SignIn component
  render(<SignIn />);

  // Check that setTitle and setDescription were called with the correct arguments
  await waitFor(() => {
    expect(setTitle).toHaveBeenCalledWith('Sign Up and Connect');
    expect(setDescription).toHaveBeenCalledWith(
      'Ready to dive into endless conversations? Sign up now and connect with friends, family, and colleagues instantly.'
    );
  });

  // Check that the form fields and buttons are present
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
});
