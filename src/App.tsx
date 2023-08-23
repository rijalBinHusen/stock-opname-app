import { createSignal, type Component } from 'solid-js';

import "./style.css"
import Home from "./pages/home";

const App: Component = () => {

  const [name, setName] = createSignal();

  return (

    <div class="container">

      <Home />
      
    </div>
  );
};

export default App;
