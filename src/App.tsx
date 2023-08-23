import {type Component } from 'solid-js';
import { Route, Routes, Router } from '@solidjs/router';

import "./style.css"
import Home from "./pages/home";
import ItemLists from './pages/item-lists';

const App: Component = () => {

  return (

    <div class="container">
      <Router>

        <Routes>
          <Route path="/items" component={ItemLists} />
          <Home />
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;
