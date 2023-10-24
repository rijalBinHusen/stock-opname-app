import { Accessor,  JSX, Setter, Show } from 'solid-js';

export interface handleFormFolderProps {
  handleFolder: Function
  folderName: Accessor<string>
  setFolder: Setter<string>
}

function FormFolder (props: handleFormFolderProps) {

  const handleFormFolder: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    
    event.preventDefault();
    props.handleFolder();
  }

  return (
    
    <div class="form-input">

      <input 
          type="text" 
          class="folder-name" 
          name="folder-name" 
          id="folder-name" 
          placeholder="Nama folder baru" 
          value={props.folderName()} 
          onInput={(e) => props.setFolder(e.currentTarget.value)}
        />
      <button onClick={handleFormFolder} class="button">Cari</button>
    </div>
  );
};

export default FormFolder;
