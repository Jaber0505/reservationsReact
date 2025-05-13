import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Chargement...');
  const [surprise, setSurprise] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/test/`)
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Erreur API"));
  }, []);

  const revealSurprise = () => {
    setSurprise('🎁 Que cette journée soit remplie de bonheur, de rires et de gâteaux ! 🎂');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title} className="fade-in">🎉 Joyeux Anniversaire 🎉</h1>
      <img
        src="https://cdn.pixabay.com/photo/2017/08/30/07/52/birthday-2697462_1280.jpg"
        alt="Anniversaire"
        style={styles.image}
        className="zoom-hover"
      />
      <p style={styles.apiMessage}>{message}</p>

      <button onClick={revealSurprise} style={styles.button}>
        Clique pour une surprise 🎈
      </button>

      {surprise && <p style={styles.surprise}>{surprise}</p>}

      <style>{`
        .fade-in {
          animation: fadeIn 2s ease-in-out forwards;
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        .zoom-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '3.5rem',
    color: '#d6336c',
    marginBottom: '1.5rem',
  },
  image: {
    width: '60%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    marginBottom: '2rem',
  },
  apiMessage: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '1.5rem',
  },
  button: {
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  surprise: {
    marginTop: '1.5rem',
    fontSize: '1.3rem',
    color: '#198754',
  },
};

export default App;
