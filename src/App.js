import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyDSKBupwR_jNNUTFeodQkOl26LlA0gjxcU";

  const handleAsk = async () => {
    setLoading(true);
    setOutput('');
    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: input }]
            },
          ],
        })
      }
      );
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      setOutput(text);
    } catch (error) {
      setOutput('Error: ' + error.message || "failed to fetch");
    } finally {
      setLoading(false);
    }
  };
return (
    <div className="App">
      <h1>Ask Gemini</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a question..."
        style ={{ width: '70%', padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleAsk} disabled={loading} style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '16px' }}>
        {loading ? 'Loading...' : 'Ask Gemini'}
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', textAlign: 'left', width: '70%' }}>
        {output}
      </div>
    </div>
  );
} 


