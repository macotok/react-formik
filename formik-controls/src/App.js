import './App.css';

import { ThemeProvider, theme } from '@chakra-ui/core';

import LoginForm from './components/LoginForm';
import React from 'react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <LoginForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
