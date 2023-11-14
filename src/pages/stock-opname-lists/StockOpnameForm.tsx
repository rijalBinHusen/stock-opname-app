import { Show, createSignal } from 'solid-js';
import { Stock, addStock, currentFolderId } from "./function";
import { setPage } from "../../components/Navigations/navigation-state";
import { items, getItems, addItem } from "../item-lists/function";

function StockForm () {

  interface StockForm extends Stock {
    is_new_item: boolean
    new_item_name?: string
  }

  const [stock, setStock] = createSignal<StockForm>({
    addition_stock: 0,
    date_stock: '',
    folder_id: '',
    height_stock: 0,
    hole_stock: 0,
    itemId: '',
    length_stock: 0,
    stockId: '',
    width_stock: 0,
    is_new_item: false
  });

  async function submitStock () {
    let { addition_stock, date_stock, height_stock, hole_stock, itemId, length_stock, width_stock, is_new_item, new_item_name } = stock();

    if(is_new_item && typeof new_item_name ==='string' && new_item_name !== "") {
      
      itemId = await addItem(new_item_name);
    }

    let message = [];
    // item can'be null
    if(itemId === "") message.push("Item tidak boleh kosong");
    if(currentFolderId() === "") message.push("Silahkan kembali ke halaman sebelumnya");
    if(height_stock === 0) message.push("Tinggi tumpukan tidak boleh kosong");
    if(length_stock === 0) message.push("Panjang tumpukan tidak boleh kosong");
    if(width_stock === 0) message.push("Lebar tumpukan tidak boleh kosong");

    if(message.length) {
      alert(message.join(", "));
      return;
    }

    addStock(itemId, height_stock, width_stock, length_stock, hole_stock, addition_stock, currentFolderId(), date_stock);
    // go to page stock list;
    setPage("stock-list");
  }
  
  getItems();

  return (

    <div class="modal-stock-opname">
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

        <label for="width-stack">Lebar penataan</label>
        <input 
          id="width-stack" 
          type="number" 
          placeholder="Lebar (Kesamping)"
          onInput={(e) => setStock({ ...stock(), width_stock: Number(e.currentTarget.value) })}
        />
        
        <label for="height-stack">Tinggi penataan</label>
        <input 
          id="height-stack" 
          type="number" 
          placeholder="Tinggi (Keatas)"
          onInput={(e) => setStock({ ...stock(), height_stock: Number(e.currentTarget.value) })}
        />

        <label for="long-stack">Panjang penataan</label>
        <input 
          id="long-stack" 
          type="number" 
          placeholder="Panjang (Kebelakang)"
          onInput={(e) => setStock({ ...stock(), length_stock: Number(e.currentTarget.value) })}
        />

        <label for="hole-stack">Penataan Lubang (Kosong)</label>
        <input 
          id="hole-stack" 
          type="number" 
          placeholder="Lubang"
          onInput={(e) => setStock({ ...stock(), hole_stock: Number(e.currentTarget.value) })}
        />

        <label for="hole-stack">Penataan lebih (Tambahan)</label>
        <input 
          id="hole-stack" 
          type="number" 
          placeholder="Lubang"
          onInput={(e) => setStock({ ...stock(), addition_stock: Number(e.currentTarget.value) })}
        />
        
        <input type="button" class="secondary-color" value="Tambahkan" onClick={submitStock}/>
        <input type="button" class="danger" value="Batal" onClick={() => setPage("stock-list")}/>
      </div>
    </div>
  );
};

export default StockForm;
