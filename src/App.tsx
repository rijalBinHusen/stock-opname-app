import {type Component, lazy } from 'solid-js';
import { Route, Routes, Router } from '@solidjs/router';

import "./style.css"
const Home = lazy(() => import ("./pages/home"));
const ItemLists = lazy(() => import("./pages/item-lists"));

const App: Component = () => {

  return (

    <div class="container">
      <Router>

        <Routes>
          <Route path="/items" component={ItemLists} />
          <Route path="/" component={Home} />
        </Routes>
      </Router>
      
    </div>
  );
};

export default App;
