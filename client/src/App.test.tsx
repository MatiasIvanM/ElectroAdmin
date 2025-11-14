import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renderiza el título principal', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /electrocentro/i });
    expect(heading).toBeInTheDocument();
  });
});
