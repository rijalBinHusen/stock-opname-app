import type { Component } from 'solid-js';

import logo from '../logo.svg';
import styles from '../App.module.css';

const Home: Component = () => {
  return (
    <div class="main-menu">
      <button class="main-menu-button button">Daftar item</button>
      <button class="main-menu-button button">Stock opname</button>
    </div>
  );
};

export default Home;
