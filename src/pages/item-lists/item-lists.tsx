import { createSignal, type Component, For } from 'solid-js';
import Navigation from '../../components/Navigation';
import FormNewItem from './form-new-item';
import ItemCard from './item-card';

export interface Item {
  itemId: string
  itemName: string
}

const initialItems: Item[] = [
  { itemId: "ITM001", itemName: "Item produk 001" },
  { itemId: "ITM002", itemName: "Item produk 002" },
  { itemId: "ITM003", itemName: "Item produk 003" },
  { itemId: "ITM004", itemName: "Item produk 004" },
]

const ItemLists: Component = () => {
  const [items, setItems] = createSignal(initialItems);

  return (
    <>
        <h1>Daftar item</h1>

        <FormNewItem setItem={setItems} />

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
