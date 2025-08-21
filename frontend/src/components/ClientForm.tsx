import React, { useState, FormEvent } from 'react';
import { API_URL } from '../config';
import { Client } from '../types/client';

interface Props {
  onClientAdded: (client: Client) => void;
}

const ClientForm: React.FC<Props> = ({ onClientAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const data = await res.json();
    onClientAdded(data);
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Client</h3>
      <label htmlFor="name">Enter Name</label>
      <input placeholder="Name" value={name} id="name" onChange={e => setName(e.target.value)} required />
      <label htmlFor="email">Enter Email</label>
      <input placeholder="Email" value={email} id="email" onChange={e => setEmail(e.target.value)} />
      <button type="submit">Add Client</button>
    </form>
  );
};

export default ClientForm;
