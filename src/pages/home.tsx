import type { Component } from 'solid-js';
import { setPage } from "../components/Navigations/navigation-state";

const Home: Component = () => {
  return (
    <div class="main-menu">
      <button onClick={ () => setPage("item")} class="main-menu-button button">Daftar item</button>
      <button onClick={ () => setPage("stock")} class="main-menu-button button">Stock opname</button>
    </div>
  );
};

export default Home;
