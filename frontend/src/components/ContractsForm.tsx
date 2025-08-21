import React, { useState, FormEvent } from 'react';
import { API_URL } from '../config';
import { Contract } from '../types/contract';
import { Client } from '../types/client';

interface Props {
  clients: Client[];
  onContractAdded: (contract: Contract) => void;
}

const ContractForm: React.FC<Props> = ({ clients, onContractAdded }) => {
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [durationMonths, setDurationMonths] = useState<number | ''>('');
  const [comments, setComments] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientId || !title || !startDate || !durationMonths) return;

    const res = await fetch(`${API_URL}/contracts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        client_id: clientId,
        start_date: startDate,
        duration_months: durationMonths,
        comments
      })
    });
    const data = await res.json();
    onContractAdded(data);
    setTitle('');
    setClientId('');
    setStartDate('');
    setDurationMonths('');
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Contract</h3>
      <label htmlFor="title">Enter Title</label>
      <input placeholder="Title" id='title' value={title} onChange={e => setTitle(e.target.value)} required />
      <label htmlFor="client">Select Client</label>
      <select value={clientId} id='client' onChange={e => setClientId(Number(e.target.value))} required>
        <option value="">Select Client</option>
        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <label htmlFor="date">Select Start Date</label>
      <input type="date" id='date' value={startDate} onChange={e => setStartDate(e.target.value)} required />
      <label htmlFor="months">Enter duration in months</label>
      <input type="number" id='months' placeholder="Duration (Months)" value={durationMonths} onChange={e => setDurationMonths(Number(e.target.value))} required />
      <label htmlFor="comments">Enter description/comments</label>
      <textarea placeholder="Comments" id='comments' value={comments} onChange={e => setComments(e.target.value)} />
      <button type="submit">Add Contract</button>
    </form>
  );
};

export default ContractForm;
