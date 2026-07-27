import { lazy } from 'react';

const loadPage = name => lazy(() => import('./index.jsx').then(module => ({ default: module[name] })));

export const Home = loadPage('Home');
export const Suites = loadPage('Suites');
export const Dining = loadPage('Dining');
export const Experiences = loadPage('Experiences');
export const ExperienceDetail = loadPage('ExperienceDetail');
export const Journal = loadPage('Journal');
export const Booking = loadPage('Booking');
export const NotFound = lazy(() => import('./NotFound.jsx'));
