import { type Component, For, JSX, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import FormNewItem from './StockOpnameForm';
import FolderCard from './StockOpnameCard';
import { type stockDetails, getstocks, getStockByFolderId } from "./function";
import { folderActive } from "../stock-opname-folder/function";

const StockLists: Component = () => {

  const [searchFolder, setSearchFolder] = createSignal("");
  

  getstocks().then(() => {
    getStockByFolderId(folderActive());
  })

  // const editFolderById: JSX.EventHandler<HTMLButtonElement, MouseEvent> = async (event) => {

  //   if(typeof event === "string" && event !== "") {

  //     const folder = await getFolderById(event);
      
  //     if(folder?.folderName) {

  //       setFolderName(folder.folderName);
  //       itemIdEdit = folder.folderId;
  //       setEditMode(true);
  //     }
  //   }
  // }

  // function createNewItem () {

  //   if(folderName() == "") return;

  //   if(itemIdEdit != "") {

  //     updateFolderNameById(itemIdEdit, folderName());
  //   } else {

  //     addFolder(folderName());
  //   }
  //   resetForm();
  // }

  function duplicateFolder () {
    alert("Function is not implemented yet!");
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
                />
              )
            }}
          </For>
        </div>
        <Navigation />
    </>
  );
};

export default StockLists;
