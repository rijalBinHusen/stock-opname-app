import type { Component } from 'solid-js';
import { A } from "@solidjs/router"

const Navigation: Component = () => {
  return (
    <div class="navigation">
        <A href="/"><button> Home </button></A>
        <A href="stocks"><button>Stock</button></A>
      </div>
  );
};

export default Navigation;
