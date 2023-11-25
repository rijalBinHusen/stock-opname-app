import type { Component } from 'solid-js';
import { setPage } from "../components/Navigations/navigation-state";

const Home: Component = () => {
  return (
    <div class="main-menu">
      <button onClick={ () => setPage("item")} class="main-menu-button button">Daftar item</button>
      <button onClick={ () => setPage("folder")} class="main-menu-button button">Stock opname</button>
      <a href="https://ibinhusen.my.id/blog/stock-opname-app/" target='_blank' class="main-menu-button button">Tutorial</a>
    </div>
  );
};

export default Home;
