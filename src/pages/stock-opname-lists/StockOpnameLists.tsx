import { type Component, For, Show, createSignal } from 'solid-js';
import Navigation from '../../components/Navigations/Navigation';
import StockOpnameCard from "./StockOpnameCard";
import { type stockDetails, getStocks, getStockByFolderId, stocks, removeStockById, getStockById, setCurrentStock, getResultStock, ResultStock } from "./function";
import { folderActive, getFolderById } from "../stock-opname-folder/function";
import { setPage } from '../../components/Navigations/navigation-state';
import StockResultCard from "./StockResultCard";

const StockLists: Component = () => {

  const [searchFolder, setSearchFolder] = createSignal("");
  const [folderName, setFolderName] = createSignal("");
  const [currentTab, setCurrentTab] = createSignal("stocks");
  

  getStocks()
  // .then(() => {
  //   getStockByFolderId(folderActive());
  // })

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

  async function detailStock(itemName: string) {
    alert("Function not implemented yet");
  }

  getFolderName();

  return (
    <>
      <h1>{ folderName() }</h1>
        
      <div class="tab">
        <button 
          class={currentTab() === 'stocks' ? 'tablinks active' : 'tablinks '}
          onClick={() => setCurrentTab("stocks")}
        >
          Stock opname
        </button>

        <button 
          class={currentTab() === 'result' ? 'tablinks active' : 'tablinks '}
          onClick={() => setCurrentTab("result")}
        >
          Hasil stock
        </button>
      </div>

      <Show
        when={currentTab() === "stocks"}
      >
        <div class="form-input">
          <input type="text"  placeholder="Cari item" />
          <button class="button">Cari</button>
        </div>
      </Show>

        <div class="lists-stock">

          {/* Stock opname lists */}
          <Show
            when={currentTab() === "stocks"}
          >
            <For each={stocks()}>
              {(stock: stockDetails) => {

                return (
                  <StockOpnameCard
                    note_stock={stock.note_stock}
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
          </Show>


          {/* Stock opname result */}


          <Show
            when={currentTab() === "result"}
          >
            <For each={getResultStock()}>
              {(stock: ResultStock) => {

                return (
                  <StockResultCard 
                    detail={detailStock}
                    itemId={stock.itemId}
                    item_name={stock.item_name}
                    total_stock={stock.total_stock}
                  />
                )
              }}
            </For>
          </Show>
        </div>
        <Show
            when={currentTab() === "stocks"}
          >

          <Navigation />
        </Show>
    </>
  );
};

export default StockLists;
