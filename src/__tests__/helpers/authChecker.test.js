import { render, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import withAuthProtection from '@/components/helpers/validators/authChecker';
import { auth } from '@/components/firebase/config';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    }),
  }));

jest.mock('../../components/firebase/config', () => ({
  // replace with your actual auth import
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

describe('withAuthProtection', () => {
  it('redirects to--- /auth/signin ---if user is not authenticated', async () => {
    auth.onAuthStateChanged.mockImplementation((callback) => callback(null));

    const TestComponent = withAuthProtection(() => <div>Test</div>, true);
    render(<TestComponent />);

    await act(async () => {});

    expect(useRouter().push).toHaveBeenCalledWith('/auth/signin');
  });

  it('redirects to--- / ---if user is authenticated', async () => {
    auth.onAuthStateChanged.mockImplementation((callback) => callback({}));

    const TestComponent = withAuthProtection(() => <div>Test</div>, false);
    render(<TestComponent />);

    await act(async () => {});

    expect(useRouter().push).toHaveBeenCalledWith('/');
  });

  it('renders the wrapped component with all its props once the authentication state is determined', async () => {
    auth.onAuthStateChanged.mockImplementation((callback) => callback({}));

    const TestComponent = withAuthProtection(() => <div data-testid="test">Test</div>, true);
    const { findByTestId } = render(<TestComponent />);

    const element = await findByTestId('test');

    expect(element).toBeInTheDocument();
  });
});
