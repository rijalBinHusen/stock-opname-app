import { type Component, For, JSX, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import StockOpnameCard from "./StockOpnameCard";
import { type stockDetails, getstocks, getStockByFolderId, stocks, removeStockById } from "./function";
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

  function delete_stock (stockId: string) {
    const confirm = window.confirm("Apakah anda yakin akan menghapus stock tersebut?");
    if(confirm) removeStockById(stockId);
  }

  function option_stock () {
    alert("Function is not implemented yet!");
  }

  return (
    <>
      <h1>Folder title</h1>
        
      <div class="tab">
        <button class="tablinks active">Stock opname</button>
        <button class="tablinks">Hasil stock</button>
      </div>

      <div class="form-input">
        <input type="text"  placeholder="Cari item" />
        <button class="button">Cari</button>
      </div>

        <div class="lists-stock">
          
          <For each={stocks()}>
            {(stock: stockDetails) => {

              return (
                <StockOpnameCard 
                  addition_stock={stock.addition_stock}
                  date_stock={stock.date_stock}
                  delete_stock={delete_stock}
                  folder_id={stock.folder_id}
                  height_stock={stock.height_stock}
                  hole_stock={stock.hole_stock}
                  itemId={stock.itemId}
                  item_name={stock.item_name}
                  length_stock={stock.length_stock}
                  option={option_stock}
                  stockId={stock.stockId}
                  total_stock={stock.total_stock}
                  width_stock={stock.width_stock}
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
