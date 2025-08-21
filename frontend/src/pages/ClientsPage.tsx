import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import ClientForm from '../components/ClientForm';
import { Client } from '../types/client';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/clients`)
      .then(res => res.json())
      .then(setClients);
  }, []);

  return (
    <div className="container">
      <h1>Clients</h1>
      <ClientForm onClientAdded={(c) => setClients(prev => [...prev, c])} />
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name} - {client.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
