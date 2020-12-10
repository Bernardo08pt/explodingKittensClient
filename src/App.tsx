import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocketProvider } from './socketProvider/SocketContext';
import Layout from './pages/Layout/Layout';

const App: React.FC = () => {
  return (
    <SocketProvider>
      <Layout />
    </SocketProvider>
  )
}

export default App;
