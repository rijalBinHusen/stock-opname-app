import { Show } from 'solid-js';
import { currentStock, setCurrentStock, addStock, currentFolderId } from "./function";
import { setPage } from "../../components/Navigations/navigation-state";
import { items, getItems, addItem } from "../item-lists/function";
import StockCalc from './StockOpnameCalc';

function StockForm () {

  async function submitStock () {
    let { date_stock, stockNumber, itemId, is_new_item, new_item_name } = currentStock();

    if(is_new_item && typeof new_item_name ==='string' && new_item_name !== "") {
      
      itemId = await addItem(new_item_name);
    }

    let message = [];
    // item can'be null
    if(itemId === "") message.push("Item tidak boleh kosong");
    if(currentFolderId() === "") message.push("Silahkan kembali dulu ke halaman utama");
    if(stockNumber === "") message.push("Hitungan stock tidak boleh kosong");

    if(message.length) {
      alert(message.join(", "));
      return;
    }

    addStock(itemId, stockNumber, currentFolderId(), date_stock);
    emptyForm();
    // go to page stock list;
    setPage("stock-list");
  }

  function setStockNumber(e: string) {
    
    setCurrentStock({...currentStock(), stockNumber: e, isCalcMode: false})
  }

  function cancelForm () {
    setPage("stock-list");
    emptyForm();
  }

  function emptyForm () {
    setCurrentStock({
      date_stock: '',
      stockNumber: '',
      folder_id: '',
      itemId: '',
      stockId: '',
      is_new_item: false,
      isCalcMode: false
    })
  }
  
  getItems();

  return (

    <div class="modal-stock-opname">


    <Show 
      when={!currentStock().isCalcMode}
    >
      <h2>Tambahkan stock baru</h2>
      <div class="form-stock-opname">

        <label for="product-name">Nama produk</label>

        <div>
          <input onChange={() => setCurrentStock({ ...currentStock(), is_new_item: !currentStock().is_new_item})} type="checkbox" id="is-new-item" />
          <label for="is-new-item">Produk baru</label>
        </div>

        <Show 
          when={!currentStock().is_new_item}
        >
          <select 
            onChange={(e) => setCurrentStock({ ...currentStock(), itemId: e.currentTarget.value })} 
            id="product-name"
            >
            <option value="">Pilih item</option>
            {items().map(item => <option selected={item.itemId === currentStock().itemId} value={item.itemId}>{item.itemName}</option>)}
          </select>
        </Show>


        <Show 
          when={currentStock().is_new_item}
        >
        <input 
          id="product-name"
          type="text" 
          placeholder="Masukkan nama item baru"
          onInput={(e) => setCurrentStock({ ...currentStock(), new_item_name: e.currentTarget.value })}
        />
        </Show>

        <label for="stock-number">Hitungan stock</label>
        <input 
          id="stock-number" 
          type="text" 
          placeholder="Hitung stock"
          value={currentStock().stockNumber}
          onFocus={() => setCurrentStock({ ...currentStock(), isCalcMode: true })}
        />
        <span>Total: {eval(currentStock().stockNumber)}</span>

        <label for="stock-note">Catatan stock</label>
        <input 
          id="stock-note" 
          type="text" 
          placeholder="Catatan stock"
        />
        
        <input type="button" class="secondary-color" value="Tambahkan" onClick={submitStock}/>
        <input type="button" class="danger" value="Batal" onClick={cancelForm}/>
      </div>
    </Show>

    <Show 
      when={currentStock().isCalcMode}
    >

      <StockCalc setStockInfo={setStockNumber} stockNumber={currentStock().stockNumber} />
    </Show>
    </div>
  );
};

export default StockForm;
