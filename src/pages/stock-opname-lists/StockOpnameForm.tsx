import { Accessor,  JSX, Setter, Show, createSignal } from 'solid-js';
import { Stock } from "./function";

// export interface handleFormFolderProps {
//   handleFolder: Function
//   folderName: Accessor<string>
//   setFolder: Setter<string>
// }

// function FormFolder (props: handleFormFolderProps) {
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

  // const handleFormFolder: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    
  //   event.preventDefault();
  //   props.handleFolder();
  // }

  return (

    <div class="modal-stock-opname">
      <h2>Tambahkan stock baru</h2>
      <div class="form-stock-opname">

        <label for="product-name">Nama produk</label>
        <input id="product-name" type="text" placeholder="Nama item"/>
        <label for="width-stack">Lebar penataan</label>
        <input id="width-stack" type="number" placeholder="Lebar (Kesamping)"/>
        <label for="height-stack">Tinggi penataan</label>
        <input id="height-stack" type="number" placeholder="Tinggi (Keatas)"/>
        <label for="long-stack">Panjang penataan</label>
        <input id="long-stack" type="number" placeholder="Panjang (Kebelakang)"/>
        <label for="hole-stack">Penataan Lubang (Kosong)</label>
        <input id="hole-stack" type="number" placeholder="Lubang"/>
        
        <input type="button" class="secondary-color" value="Tambahkan"/>
      </div>
    </div>
  );
};

export default StockForm;
