import React from 'react';

export default function Navbar({ onHome, onLogout, isLoggedIn }) {
  return (
    <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.5rem 1rem', borderBottom: '1px solid #ddd' }}>
      <div style={{ fontWeight: 'bold' }}>Monitoria</div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
        <button onClick={onHome}>Home</button>
        {isLoggedIn && <button onClick={onLogout}>Logout</button>}
      </div>
    </nav>
  );
}
