import { type Component, For, JSX, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import FormNewItem from './form-new-item';
import ItemCard from './item-card';
import { type Item, items, addItem, getItems } from "./function";

const ItemLists: Component = () => {

  const [itemToEdit, setItemToEdit] = createSignal("");

  getItems();

  const editItemById: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {

    if(typeof event === "string" && event !== "") {

      setItemToEdit(event);
    }
  }

  function createNewItem () {

    if(itemToEdit() == "") return;

    addItem(itemToEdit());
    setItemToEdit("");
  }

  return (
    <>
        <h1>Daftar item</h1>

        <FormNewItem 
          addItem={createNewItem} 
          itemName={itemToEdit} 
          setItem={setItemToEdit}
        />

        <div class="lists-item">
          
          <For each={items()}>
            {(item: Item) => {

              return (<ItemCard itemId={item.itemId} itemName={item.itemName} editItem={ editItemById } />)
            }}
          </For>
        </div>
        <Navigation />
    </>
  );
};

export default ItemLists;
