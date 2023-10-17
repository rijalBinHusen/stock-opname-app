import { type Component, Switch, Match } from 'solid-js';
import { setPage, page } from "./navigation-state";

const Navigation: Component = () => {

  const secondBTN = {
    "item": {
      title: 'Stock',
      page: 'folder'
    },
    "folder": {
      title: 'Item',
      page: 'item'
    }
  }

  // jika folder maka tampilkan item
  // jika item maka tampilkan folder
  return (
    <div class="navigation">
      <button onclick={() => setPage("home")}>Home</button>

      <Switch fallback={ <button onclick={() => setPage("folder")}>Stock</button> }>
        <Match when={page() === "item"} ><button onclick={() => setPage("folder")}>Stock</button></Match>
        <Match when={page() === "folder"} ><button onclick={() => setPage("item")}>Item</button></Match>
      </Switch>
    </div>
  );
};

export default Navigation;
