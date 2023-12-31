import {type Component, lazy, Switch, Match } from 'solid-js';
import { page } from "./components/Navigations/navigation-state";

import "./style.css"
const Home = lazy(() => import ("./pages/home"));
const ItemLists = lazy(() => import("./pages/item-lists/item-lists"));
const StockFolder = lazy(() => import("./pages/stock-opname-folder/StockOpnameFolder"));
const StockLists = lazy(() => import("./pages/stock-opname-lists/StockOpnameLists"));
const StockAdd = lazy(() => import("./pages/stock-opname-lists/StockOpnameForm"));

const App: Component = () => {

  return (

    <div class="container">

      
      <Switch fallback={<Home />}>
        <Match when={page() === "item"} ><ItemLists /></Match>
        <Match when={page() === "folder"} ><StockFolder /></Match>
        <Match when={page() === "stock-list"} ><StockLists /></Match>
        <Match when={page() === "stock-add"} ><StockAdd /></Match>
      </Switch>      
    </div>
  );
};

export default App;
