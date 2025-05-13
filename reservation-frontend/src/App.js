import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Chargement...');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/test/`)
      .then((res) => setMessage(res.data.message))
      .catch(() => setMessage("Erreur API"));
  }, []);

  return (
    <div>
      <h1>Test appel Django API</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
