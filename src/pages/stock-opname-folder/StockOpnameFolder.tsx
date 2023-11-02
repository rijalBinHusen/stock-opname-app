import { type Component, For, JSX, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import FormNewItem from './FormFolder';
import FolderCard from './FolderCard';
import { type Folder, folders, addFolder, getFolders, getFolderById, updateFolderNameById } from "./function";
import { setCurrentFolderId } from "../stock-opname-lists/function";
import { setPage } from "../../components/Navigations/navigation-state";

const ItemLists: Component = () => {

  const [folderName, setFolderName] = createSignal("");
  const [isEditMode, setEditMode] = createSignal(false);
  let itemIdEdit = "";
  

  getFolders();

  function resetForm () {

    setFolderName("");
    setEditMode(false);
    itemIdEdit = "";
  }

  const editFolderById: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (event) => {

    if(typeof event === "string" && event !== "") {

      const folder = await getFolderById(event);
      
      if(folder?.folderName) {

        setFolderName(folder.folderName);
        itemIdEdit = folder.folderId;
        setEditMode(true);
      }
    }
  }

  function createNewItem () {

    if(folderName() == "") return;

    if(itemIdEdit != "") {

      updateFolderNameById(itemIdEdit, folderName());
    } else {

      addFolder(folderName());
    }
    resetForm();
  }

  function duplicateFolder () {
    alert("Function is not implemented yet!");
  }

  function chooseCurrentFolder(idFolder: string) {
    setPage("stock-list")
    setCurrentFolderId(idFolder);
  }

  return (
    <>
        <h1>Stock folder</h1>

        <FormNewItem 
          handleFolder={createNewItem} 
          folderName={folderName} 
          setFolder={setFolderName}
          isEditMode={isEditMode}
          cancel={resetForm}
        />

        <div class="lists-folder">
          
          <For each={folders()}>
            {(folder: Folder) => {

              return (
                <FolderCard 
                  folderId={folder.folderId} 
                  folderName={folder.folderName} 
                  editFolder={ editFolderById } 
                  folderCounter={folder.folderCounter}
                  duplicateFolder={duplicateFolder}
                  chooseFolder={chooseCurrentFolder}
                />
              )
            }}
          </For>
        </div>
        <Navigation />
    </>
  );
};

export default ItemLists;
