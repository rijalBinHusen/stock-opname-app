import { ResultStock } from "./function"

interface ResultProps extends ResultStock {
    detail: Function
}

export default function ResultCard (props: ResultProps) {
    
    return (

        <div class="stock-opname-card">
          <div class="stock-opname-info">
            <span>{props.item_name}</span>
            <span>Total stock = <span class="total">{props.total_stock}</span></span>
          </div>
          <div class="stock-opname-option">
            <button class="secondary-color" onClick={() => props.detail(props.item_name)}>Details</button>
          </div>
        </div>
    )
}