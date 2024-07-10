import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect, jest, beforeAll } from '@jest/globals';
import App from '../src/App'; // Ajusta la ruta según sea necesario

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));

describe('main.jsx', () => {
  let createRoot;

  beforeAll(async () => {
    createRoot = (await import('react-dom/client')).createRoot;
  });

  it('should render the App component without crashing', async () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Import the main.jsx file which will use the mocked createRoot
    await import('../src/main.jsx'); // Ajusta la ruta según sea necesario

    // Check if createRoot was called with the root element
    expect(createRoot).toHaveBeenCalledWith(rootElement);

    // Check if the render method was called with the App component wrapped in React.StrictMode
    expect(createRoot().render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});
