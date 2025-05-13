// src/components/Loading.jsx
import React from 'react';

const spinnerStyle = {
  border: '6px solid #f3f3f3',
  borderTop: '6px solid #0d6efd',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  animation: 'spin 1s linear infinite',
  margin: 'auto',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f8f9fa',
};

const textStyle = {
  marginTop: '1rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#0d6efd',
};

export default function Loading() {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      <p style={textStyle}>Chargement...</p>
    </div>
  );
}
