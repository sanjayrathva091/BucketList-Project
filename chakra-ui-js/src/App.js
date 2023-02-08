import React from 'react';
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import AllRoutes from './pages/routes/AllRoutes';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <AllRoutes />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
