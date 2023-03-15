import { render, screen } from '@testing-library/react';
import App from './App';

it('App is present', async() => {
    render(<App />,)
    expect(screen.getByText("App Host")).toBeDefined()
    expect(await screen.findByText("App Remote Large Button")).toBeDefined()
    screen.debug()
});