import { StrictMode } from '/src/vendor/react.bundle.mjs';
import { createRoot } from '/src/vendor/react-dom-client.bundle.mjs';
import { App } from './App';
import './styles/global.css';
import './styles/home-responsive.css';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
