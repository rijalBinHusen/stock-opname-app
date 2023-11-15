import { type Component, For, JSX, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import StockOpnameCard from "./StockOpnameCard";
import { type stockDetails, getstocks, getStockByFolderId, stocks, removeStockById, getStockById, setCurrentStock } from "./function";
import { folderActive, getFolderById } from "../stock-opname-folder/function";
import { setPage } from '../../components/Navigations/navigation-state';

const StockLists: Component = () => {

  const [searchFolder, setSearchFolder] = createSignal("");
  const [folderName, setFolderName] = createSignal("");
  

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

  async function option_stock (stockId: string) {
    const getStock = await getStockById(stockId);

    if(getStock) {

      let stockFormToSet = { ...getStock, is_new_item: false, isCalcMode: false}
      setCurrentStock(stockFormToSet);

      setPage("stock-add");
    }
  }

  async function getFolderName () {
    const getFolder = await getFolderById(folderActive());

    if(getFolder) {
      setFolderName(getFolder.folderName)
    }
  }

  getFolderName();

  return (
    <>
      <h1>{ folderName() }</h1>
        
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
                  date_stock={stock.date_stock}
                  delete_stock={delete_stock}
                  folder_id={stock.folder_id}
                  itemId={stock.itemId}
                  item_name={stock.item_name}
                  option={option_stock}
                  stockId={stock.stockId}
                  total_stock={stock.total_stock}
                  stockNumber={stock.stockNumber}
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
