import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main>
      <p className="eyebrow">AI-Powered LinkedIn</p>
      <h1>Your content workflow starts here.</h1>
      <p>Configure a strategy, generate options, review every draft, and publish on your schedule.</p>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

