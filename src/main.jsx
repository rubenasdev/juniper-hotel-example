import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';
import './styles/home-responsive.css';
import { applyLanguage, getLanguage } from './i18n';

applyLanguage(getLanguage());

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
