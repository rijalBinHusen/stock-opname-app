import { type Component, For, JSX, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import FormNewItem from './form-new-item';
import ItemCard from './item-card';
import { type Item, items, addItem, getItems } from "./function";

const ItemLists: Component = () => {

  const [itemName, setItemName] = createSignal("");
  const [isEditMode, setEditMode] = createSignal(false);
  

  getItems();

  function resetForm () {

    setItemName("");
    setEditMode(false);
  }

  const editItemById: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {

    if(typeof event === "string" && event !== "") {

      setItemName(event);
      setEditMode(true);
    }
  }

  function createNewItem () {

    if(itemName() == "") return;

    addItem(itemName());
    resetForm();
  }

  return (
    <>
        <h1>Daftar item</h1>

        <FormNewItem 
          addItem={createNewItem} 
          itemName={itemName} 
          setItem={setItemName}
          isEditMode={isEditMode}
          cancel={resetForm}
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
