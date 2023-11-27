import { Setter, createSignal } from 'solid-js';
import "./stockOpnameCalc.css";

interface calcProps {
  setStockInfo: Function
  stockNumber: string
}

function StockCalc (props:calcProps) {

  const [stockSum, setStockSum] = createSignal<string>(props.stockNumber);

  function addBracket() {

    let indexStartBracket = stockSum().lastIndexOf("(");
    let indexEndBracket = stockSum().lastIndexOf(")");

    // let isAddStartBracket = ;
    let isAddEndBracket = (indexEndBracket === -1 && indexStartBracket !== -1) || indexStartBracket > indexEndBracket

    if(isAddEndBracket) setStockSum(stockSum() + ")");
    else setStockSum(stockSum() + "(");

  }

  function backward() {

    setStockSum(stockSum().slice(0, -1));
  }

  return (
    <div class="formstyle">
      <form name="form1">

        <input id="calc" disabled type="text" name="answer" value={stockSum()}/> 
        <br/>
        <br/>
        
        <input type="button" value="7" onClick={() => setStockSum(stockSum() + '7')}/>
        <input type="button" value="8" onClick={() => setStockSum(stockSum() + '8')}/>
        <input type="button" value="9" onClick={() => setStockSum(stockSum() + '9')}/>
        <input type="button" value="+" onClick={() => setStockSum(stockSum() + '+')}/>
        <br/>
        <br/>

        <input type="button" value="4" onClick={() => setStockSum(stockSum() + '4')}/>
        <input type="button" value="5" onClick={() => setStockSum(stockSum() + '5')}/>
        <input type="button" value="6" onClick={() => setStockSum(stockSum() + '6')}/>
        <input type="button" value="*" onClick={() => setStockSum(stockSum() + '*')}/>
        <br/>
        <br/>

        <input type="button" value="1" onClick={() => setStockSum(stockSum() + '1')}/>
        <input type="button" value="2" onClick={() => setStockSum(stockSum() + '2')}/>
        <input type="button" value="3" onClick={() => setStockSum(stockSum() + '3')}/>
        <input type="button" value="-" onClick={() => setStockSum(stockSum() + '-')}/>
        <br/>
        <br/>


        <input type="button" value="( )" onClick={addBracket}/>
        <input type="button" value="0" onClick={() => setStockSum(stockSum() + '0')}/>
        <input type="button" value="&#x21A9;" onClick={backward}/>
          
        <input type="button" value="OK" onClick={() => props.setStockInfo(stockSum())}/>
        <br />
        
        <br />

      </form>
    </div>
  );
};

export default StockCalc;
