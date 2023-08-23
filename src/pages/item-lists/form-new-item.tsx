import { createSignal, type Component, type Setter, JSX } from 'solid-js';
import { type Item } from "./item-lists"

export interface AddItemProps {
  setItem: Setter<Item[]>;
}

const emptyItem: Item = { itemId: "", itemName: "" };

function FormNewItem (props: AddItemProps) {
  
  const [newItem, setNewItem] = createSignal(emptyItem);

  const addItem: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    props.setItem((items) => [...items, newItem()]);
    setNewItem(emptyItem);
  }

  return (
    
    <div class="form-input">
        <input type="text" class="item-name" name="item-name" id="item-name" placeholder="Nama item baru" value={newItem().itemName} onInput={(e) => {
          setNewItem({ ...newItem(), itemName: e.currentTarget.value})
        }}/>
        <button onClick={addItem} class="button">Tambah</button>
    </div>
  );
};

export default FormNewItem;
