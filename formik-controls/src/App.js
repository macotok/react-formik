import './App.css';

import { ThemeProvider, theme } from '@chakra-ui/core';

import EnrollmentForm from './components/EnrollmentForm';
import React from 'react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <EnrollmentForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
