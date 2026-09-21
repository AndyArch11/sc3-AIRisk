import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AI Risk app without crashing', () => {
  expect(() => {
    render(<App />);
  }).not.toThrow();

  expect(screen.getAllByText(/AI Risk/i).length).toBeGreaterThan(0);
});
