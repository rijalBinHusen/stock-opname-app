import {type Component, lazy, Switch, Match } from 'solid-js';
import { page } from "./components/Navigations/navigation-state";

import "./style.css"
const Home = lazy(() => import ("./pages/home"));
const ItemLists = lazy(() => import("./pages/item-lists/item-lists"));

const App: Component = () => {

  return (

    <div class="container">

      
      <Switch fallback={<Home />}>
        <Match when={page() === "item"} ><ItemLists /></Match>
      </Switch>      
    </div>
  );
};

export default App;
