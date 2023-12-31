
import type { stockDetails } from "./function";

interface StockProps extends stockDetails {
    option: Function
    delete_stock: Function
}

export default function StockCard (props: StockProps) {
  return (
    <div class="stock-opname-card">
      <div class="stock-opname-info">
        <span>{props.item_name}</span>
        <span>
          {props.stockNumber} =
          <span class="total">
            {props.total_stock}
          </span>
        </span>
        <span style="background-color:gainsboro">{props.note_stock}</span>
      </div>
      <div class="stock-opname-option">
        <button class="secondary-color" onClick={ () => props.option(props.stockId)}>Edit</button>
        <button class="danger" onClick={ () => props.delete_stock(props.stockId)}>Delete</button>
      </div>
  </div>
  );
};