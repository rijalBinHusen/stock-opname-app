import { Accessor,  JSX, Setter, Show } from 'solid-js';

export interface AddItemProps {
  addItem: Function
  itemName: Accessor<string>
  setItem: Setter<string>
  isEditMode: Accessor<boolean>
  cancel: Function
}

function FormNewItem (props: AddItemProps) {

  const addItem: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    
    event.preventDefault();
    props.addItem();
  }

  return (
    
    <div class="form-input">

      <input 
          type="text" 
          class="item-name" 
          name="item-name" 
          id="item-name" 
          placeholder="Nama item baru" 
          value={props.itemName()} 
          onInput={(e) => props.setItem(e.currentTarget.value)}
        />
      <button onClick={addItem} class="button">{props.isEditMode() ? 'Update' : 'Tambah'}</button>
      <Show when={props.isEditMode()}>

        <button onClick={ () =>props.cancel()} class="button">Cancel</button>
      </Show>
    </div>
  );
};

export default FormNewItem;
