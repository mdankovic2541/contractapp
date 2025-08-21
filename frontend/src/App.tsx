import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ContractsPage from './pages/ContractsPage';
import ClientsPage  from './pages/ClientsPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/clients" style={{ marginRight: '10px' }}>Clients</Link>
        <Link to="/contracts">Contracts</Link>
      </nav>
      <Routes>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
