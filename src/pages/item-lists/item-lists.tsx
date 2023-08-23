import { createSignal, type Component, For } from 'solid-js';
import Navigation from '../../components/Navigation';
import FormNewItem from './form-new-item';
import ItemCard from './item-card';
import { type Item, items, addItem, getItems } from "./function";

const ItemLists: Component = () => {

  getItems();

  return (
    <>
        <h1>Daftar item</h1>

        <FormNewItem addItem={addItem} />

        <div class="lists-item">
          
          <For each={items()}>
            {(item: Item) => {

              return (<ItemCard itemId={item.itemId} itemName={item.itemName} />)
            }}
          </For>
        </div>
        <Navigation />
    </>
  );
};

export default ItemLists;
