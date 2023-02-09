import { render } from '@testing-library/react';
const ExternalComponent = import('module2/ExternalComponent');

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome module1/gi)).toBeTruthy();
  });

  it('should have render module 2 component', async() => {
    const Component = (await ExternalComponent).default
    const wrapper = render(<Component/>);
    expect(wrapper).toMatchSnapshot()
  });
});
