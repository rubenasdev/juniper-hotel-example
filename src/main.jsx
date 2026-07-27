import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/global.css';
import './styles/home-responsive.css';
import { gsap, ScrollTrigger } from './lib/gsap';
import { applyLanguage, getLanguage } from './i18n';

// Temporary compatibility bridge for the legacy animation calls in page modules.
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
applyLanguage(getLanguage());

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
