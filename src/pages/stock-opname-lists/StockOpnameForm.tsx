import { Accessor,  JSX, Setter, Show, createSignal } from 'solid-js';
import { Stock, addStock, currentFolderId } from "./function";

function StockForm () {

  const [stock, setStock] = createSignal<Stock>({
    addition_stock: 0,
    date_stock: '',
    folder_id: '',
    height_stock: 0,
    hole_stock: 0,
    itemId: '',
    length_stock: 0,
    stockId: '',
    width_stock: 0
  });

  function submitStock () {
    const { addition_stock, date_stock, height_stock, hole_stock, itemId, length_stock, width_stock } = stock();
    addStock(itemId, height_stock, width_stock, length_stock, hole_stock, addition_stock, currentFolderId(), date_stock)
  }

  return (

    <div class="modal-stock-opname">
      <h2>Tambahkan stock baru</h2>
      <div class="form-stock-opname">

        <label for="product-name">Nama produk</label>
        <input 
          id="product-name"
          type="text" 
          placeholder="Nama item"
          onInput={(e) => setStock({ ...stock(), itemId: e.currentTarget.value })}
        />

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
      </div>
    </div>
  );
};

export default StockForm;
