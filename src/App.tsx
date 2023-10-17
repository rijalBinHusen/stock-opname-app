import {type Component, lazy, Switch, Match } from 'solid-js';
import { page } from "./components/Navigations/navigation-state";

import "./style.css"
const Home = lazy(() => import ("./pages/home"));
const ItemLists = lazy(() => import("./pages/item-lists/item-lists"));
const StockFolder = lazy(() => import("./pages/stock-opname-folder/StockOpnameFolder"));

const App: Component = () => {

  return (

    <div class="container">

      
      <Switch fallback={<Home />}>
        <Match when={page() === "item"} ><ItemLists /></Match>
        <Match when={page() === "stock"} ><StockFolder /></Match>
      </Switch>      
    </div>
  );
};

export default App;
