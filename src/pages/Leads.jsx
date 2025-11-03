import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Leads() {
  const [publicLeads, setPublicLeads] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [pubRes, myRes] = await Promise.all([API.get('/enquiries/public'), API.get('/enquiries/my')]);
      setPublicLeads(pubRes.data);
      setMyLeads(myRes.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const claim = async id => {
    try {
      await API.post(`/enquiries/${id}/claim`);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || 'Claim failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Unclaimed Leads</h3>
      {publicLeads.length === 0 ? 'No public leads' : publicLeads.map(l => (
        <div key={l._id}>
          <b>{l.name}</b> — {l.courseInterest} — {l.email}
          <button onClick={() => claim(l._id)}>Claim</button>
        </div>
      ))}

      <h3>My Leads</h3>
      {myLeads.length === 0 ? 'You have no claimed leads' : myLeads.map(l => (
        <div key={l._id}><b>{l.name}</b> — {l.courseInterest} — {l.email} — claimed at {new Date(l.claimedAt).toLocaleString()}</div>
      ))}
    </div>
  );
}
