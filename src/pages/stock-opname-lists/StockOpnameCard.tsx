
import Button from "../../components/Button"
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
          {props.length_stock} x 
          {props.height_stock} x 
          {props.length_stock} + 
          {props.addition_stock} - 
          {props.hole_stock} = 
          <span class="total">
            {props.total_stock}
          </span>
        </span>
        <span>{props.date_stock}</span>
      </div>
      <div class="stock-opname-option">
        <button class="secondary-color" onClick={ () => props.option(props.stockId)}>Opsi</button>
        <button class="danger" onClick={ () => props.delete_stock(props.stockId)}>Delete</button>
      </div>
  </div>
  );
};