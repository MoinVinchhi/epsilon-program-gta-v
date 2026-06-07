// src/components/TestComponent.jsx
import React from 'react';
import { useTheme } from '../usetheamContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  // Apply theme classes
  const headerClass = `p-5 ${theme === 'blue' ? 'bg-blue-primary-bg text-blue-text-light' : 'bg-dark-primary-bg text-dark-text-light'}`;
  const buttonClass = `p-2 m-4 ${theme === 'blue' ? 'bg-blue-highlight' : 'bg-dark-highlight'}`;

  return (
    <header className={headerClass}>
      <button onClick={toggleTheme} className={buttonClass}>
        Toggle Theme
      </button>
      <p>Current Theme: {theme}</p>
    </header>
  );
};

export default TestComponent;
