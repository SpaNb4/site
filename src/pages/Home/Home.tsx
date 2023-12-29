import React from 'react';

import { Navbar, Footer } from '../../components';
import { Partnered, Principles } from '../commonSections';

import {
  Main,
  About,
  Numbers,
  Pictures,
  School,
  Courses,
  Alumni,
  Events,
  Merch,
  Community,
  Contribute,
  Speakers,
  Support,
  Places
} from './sections';

import './Home.scss';
import { useTitle } from '../../hooks';

export const Home: React.FC = () => {
  useTitle('Home');
  return (
    <div className="App">
      <Navbar />
      <Main />
      <About />
      <Numbers />
      <Places />
      <Pictures />
      <School />
      <Principles />
      <Courses />
      <Alumni />
      <Events />
      <Speakers />
      <Merch />
      <Community />
      <Contribute />
      <Support />
      <Partnered />
      <Footer />
    </div>
  );
};
