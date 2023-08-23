import type { Component } from 'solid-js';
import { A } from "@solidjs/router";

const Home: Component = () => {
  return (
    <div class="main-menu">
      <A href='/items'><button class="main-menu-button button">Daftar item</button></A>
      <A href='/stocks'><button class="main-menu-button button">Stock opname</button></A>
    </div>
  );
};

export default Home;
