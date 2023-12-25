import { render, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useCtx } from '@/Context/AppContext';
import Custom404 from '@/pages/404';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../Context/AppContext', () => ({
  useCtx: jest.fn(),
}));

describe('Custom404', () => {
  it('calls setTitle, setDescription and router.replace with correct arguments', () => {
    const setTitle = jest.fn();
    const setDescription = jest.fn();
    const replace = jest.fn();

    useRouter.mockImplementation(() => ({ replace }));
    useCtx.mockImplementation(() => ({ setTitle, setDescription }));

    act(() => {
      render(<Custom404 />);
    });

    expect(setTitle).toHaveBeenCalledWith('Oops! Page Not Found');
    expect(setDescription).toHaveBeenCalledWith(
      'We couldn’t find the page you were looking for. Please check the URL or return to the homepage'
    );
    expect(replace).toHaveBeenCalledWith('/');
  });
});