import { Show, createSignal } from 'solid-js';
import { Stock, addStock, currentFolderId } from "./function";
import { setPage } from "../../components/Navigations/navigation-state";
import { items, getItems, addItem } from "../item-lists/function";
import StockCalc from './StockOpnameCalc';

function StockForm () {

  interface StockForm extends Stock {
    is_new_item: boolean
    isCalcMode: boolean
    new_item_name?: string
  }

  const [stock, setStock] = createSignal<StockForm>({
    date_stock: '',
    stockNumber: '',
    folder_id: '',
    itemId: '',
    stockId: '',
    is_new_item: false,
    isCalcMode: false
  });

  async function submitStock () {
    let { date_stock, stockNumber, itemId, is_new_item, new_item_name } = stock();

    if(is_new_item && typeof new_item_name ==='string' && new_item_name !== "") {
      
      itemId = await addItem(new_item_name);
    }

    let message = [];
    // item can'be null
    if(itemId === "") message.push("Item tidak boleh kosong");
    if(currentFolderId() === "") message.push("Silahkan kembali ke halaman sebelumnya");
    if(stockNumber === "") message.push("Hitungan stock tidak boleh kosong");

    if(message.length) {
      alert(message.join(", "));
      return;
    }

    addStock(itemId, stockNumber, currentFolderId(), date_stock);
    // go to page stock list;
    setPage("stock-list");
  }

  function setStockNumber(e: string) {
    
    setStock({...stock(), stockNumber: e, isCalcMode: false})
  }
  
  getItems();

  return (

    <div class="modal-stock-opname">


    <Show 
      when={!stock().isCalcMode}
    >
      <h2>Tambahkan stock baru</h2>
      <div class="form-stock-opname">

        <label for="product-name">Nama produk</label>

        <div>
          <input onChange={() => setStock({ ...stock(), is_new_item: !stock().is_new_item})} type="checkbox" id="is-new-item" />
          <label for="is-new-item">Produk baru</label>
        </div>

        <Show 
          when={!stock().is_new_item}
        >
          <select 
            onChange={(e) => setStock({ ...stock(), itemId: e.currentTarget.value })} 
            id="product-name"
            >
            <option value="">Pilih item</option>
            {items().map(item => <option value={item.itemId}>{item.itemName}</option>)}
          </select>
        </Show>


        <Show 
          when={stock().is_new_item}
        >
        <input 
          id="product-name"
          type="text" 
          placeholder="Masukkan nama item baru"
          onInput={(e) => setStock({ ...stock(), new_item_name: e.currentTarget.value })}
        />
        </Show>

        <label for="stock-number">Hitungan stock</label>
        <input 
          id="stock-number" 
          type="text" 
          placeholder="Hitung stock"
          value={stock().stockNumber}
          onFocus={() => setStock({ ...stock(), isCalcMode: true })}
        />
        <span>Total: {eval(stock().stockNumber)}</span>

        <label for="stock-note">Catatan stock</label>
        <input 
          id="stock-note" 
          type="text" 
          placeholder="Catatan stock"
        />
        
        <input type="button" class="secondary-color" value="Tambahkan" onClick={submitStock}/>
        <input type="button" class="danger" value="Batal" onClick={() => setPage("stock-list")}/>
      </div>
    </Show>

    <Show 
      when={stock().isCalcMode}
    >

      <StockCalc setStockInfo={setStockNumber} stockNumber={stock().stockNumber} />
    </Show>
    </div>
  );
};

export default StockForm;
