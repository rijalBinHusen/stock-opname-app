import type { Component } from 'solid-js';
import { setPage } from "./navigation-state";
import { A } from "@solidjs/router"

const Navigation: Component = () => {
  return (
    <div class="navigation">
        <button onclick={() => setPage("home")}>Home</button>
        <button onclick={() => setPage("stock")}>Stock</button>
      </div>
  );
};

export default Navigation;
