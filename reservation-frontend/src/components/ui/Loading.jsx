import React from 'react';
import CenteredContainer from 'components/ui/CenteredContainer';

const spinnerStyle = {
  border: '6px solid #f3f3f3',
  borderTop: '6px solid #0d6efd',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  animation: 'spin 1s linear infinite',
  margin: 'auto',
};

const textStyle = {
  marginTop: '1rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#0d6efd',
};

export default function Loading() {
  return (
    <CenteredContainer>
      <div style={spinnerStyle} />
      <p style={textStyle}>Chargement...</p>
    </CenteredContainer>
  );
}
