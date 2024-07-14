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

    await import('../src/main.jsx');

    expect(createRoot).toHaveBeenCalledWith(rootElement);

    expect(createRoot().render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});
