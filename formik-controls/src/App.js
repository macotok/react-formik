import './App.css';

import { ThemeProvider, theme } from '@chakra-ui/core';

import FormikContainer from './components/FormikContainer';
import React from 'react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <FormikContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
