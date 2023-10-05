import { createSignal,  JSX } from 'solid-js';

export interface AddItemProps {
  addItem: Function;
  itemName: string
}

const itemNameEmpty = "";

function FormNewItem (props: AddItemProps) {
  
  const [newItem, setNewItem] = createSignal(itemNameEmpty);

  const addItem: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    
    event.preventDefault();
    if(newItem() === "") return;
    
    props.addItem(newItem());
    setNewItem("");
  }

  return (
    
    <div class="form-input">

      <input 
          type="text" 
          class="item-name" 
          name="item-name" 
          id="item-name" 
          placeholder="Nama item baru" 
          value={props.itemName} 
          onInput={(e) => {setNewItem(e.currentTarget.value)}}
        />
      <button onClick={addItem} class="button">Tambah</button>
    </div>
  );
};

export default FormNewItem;
