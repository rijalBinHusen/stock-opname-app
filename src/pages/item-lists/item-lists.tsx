import { type Component, For, JSX, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import FormNewItem from './form-new-item';
import ItemCard from './item-card';
import { type Item, items, addItem, getItems, getItemById, updateItemById } from "./function";

const ItemLists: Component = () => {

  const [itemName, setItemName] = createSignal("");
  const [isEditMode, setEditMode] = createSignal(false);
  let itemIdEdit = "";
  

  getItems();

  function resetForm () {

    setItemName("");
    setEditMode(false);
    itemIdEdit = "";
  }

  const editItemById: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (event) => {

    if(typeof event === "string" && event !== "") {

      const item = await getItemById(event);
      
      if(item?.itemName) {

        setItemName(item.itemName);
        itemIdEdit = item.itemId;
        setEditMode(true);
      }
    }
  }

  function createNewItem () {

    if(itemName() == "") return;

    if(itemIdEdit != "") {

      updateItemById(itemIdEdit, itemName());
    } else {

      addItem(itemName());
    }
    resetForm();
  }

  return (
    <>
        <h1>Daftar item</h1>

        <FormNewItem 
          handleItem={createNewItem} 
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
