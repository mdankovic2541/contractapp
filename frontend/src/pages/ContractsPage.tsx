import React, { useEffect, useState } from 'react';
import { Contract } from '../types/contract';
import { Client } from '../types/client';
import { API_URL } from '../config';
import ContractForm from '../components/ContractsForm';

const ContractsPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [filterClientId, setFilterClientId] = useState<number | ''>('');

  useEffect(() => {
    fetch(`${API_URL}/contracts`)
      .then(res => res.json())
      .then(setContracts);

    fetch(`${API_URL}/clients`)
      .then(res => res.json())
      .then(setClients);
  }, []);

  const filteredContracts = filterClientId
    ? contracts.filter(c => c.client_id === filterClientId)
    : contracts;

  return (
    <div className="container"> 
      <h1>Contracts</h1>
      <ContractForm clients={clients} onContractAdded={c => setContracts(prev => [...prev, c])} />

      <div className="filter">
        <label>Filter by Client: </label>
        <select value={filterClientId} onChange={e => setFilterClientId(Number(e.target.value) || '')}>
          <option value="">All</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <ul>
        {filteredContracts.map(contract => (
          <li key={contract.id}>
            <strong>{contract.title}</strong> - {contract.client?.name || contract.client_id} - Start: {contract.start_date} - Duration: {contract.duration_months} months
            <p>{contract.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContractsPage;
