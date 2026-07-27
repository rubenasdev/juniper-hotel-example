import { lazy } from 'react';

export const Home = lazy(() => import('./HomePage').then(module => ({ default: module.Home })));
export const Suites = lazy(() => import('./SuitesPage').then(module => ({ default: module.Suites })));
export const Dining = lazy(() => import('./DiningPage').then(module => ({ default: module.Dining })));
export const Experiences = lazy(() => import('./ExperiencesPage').then(module => ({ default: module.Experiences })));
export const ExperienceDetail = lazy(() => import('./ExperiencesPage').then(module => ({ default: module.ExperienceDetail })));
export const Journal = lazy(() => import('./JournalPage').then(module => ({ default: module.Journal })));
export const Booking = lazy(() => import('./BookingPage').then(module => ({ default: module.Booking })));
export const NotFound = lazy(() => import('./NotFound.jsx'));
