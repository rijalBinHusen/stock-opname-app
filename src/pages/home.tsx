import type { Component } from 'solid-js';
import ItemLists from './item-lists/item-lists';
import { setPage } from "../components/Navigations/navigation-state";
// import Home from './'
// import { A } from "@solidjs/router";

const Home: Component = () => {
  return (
    <div class="main-menu">
      <button class="main-menu-button button">Daftar item</button>
      <button class="main-menu-button button">Stock opname</button>
    </div>
  );
};

export default Home;
