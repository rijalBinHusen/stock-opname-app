import { createSignal } from "solid-js";
import { getItemById } from "../item-lists/function";
import { folderActive, setFolderActive, updateFolderCounterById } from "../stock-opname-folder/function";

export interface Stock {
    stockId: string
    itemId: string
    stockNumber: string
    folder_id: string
    note_stock: string
}

export interface stockDetails extends Stock {
    total_stock: number
    item_name: string
}

interface StockForm extends Stock {
    is_new_item: boolean
    isCalcMode: boolean
    new_item_name?: string
}

export interface ResultStock {
    item_name: string
    total_stock: number
    itemId: string
}

const state = <stockDetails[]>[];


export const [stocks, setStocks] = createSignal(state);
export const [currentStock, setCurrentStock] = createSignal<StockForm>({
    note_stock: '',
    stockNumber: '',
    folder_id: '',
    itemId: '',
    stockId: '',
    is_new_item: false,
    isCalcMode: false,
    new_item_name: ""
});

export async function addStock(itemId: string, stockNumber: string, folder_id: string, note_stock: string): Promise<string> {

    const randomString = (Math.random() + 1).toString(36).substring(8);
    const stockId = randomString + stocks().length;

    let isNeedToGetStock = stocks().length === 0 || folderActive() !== folder_id;

    if (isNeedToGetStock) await getStocks();

    const total_stock = eval(stockNumber);
    const getItem = await getItemById(itemId)
    const item_name = getItem ? getItem?.itemName : 'Item tidak ditemukan';

    setStocks((stocks) => [{
        stockId,
        itemId,
        stockNumber,
        total_stock,
        item_name,
        folder_id,
        note_stock
    }, ...stocks]);

    updateFolderCounterById(folder_id, +1)
    saveToLocalStorage();

    return stockId
}

export async function getStocks(): Promise<void> {
    if (stocks().length > 0) setStocks([]);

    const getstocks = localStorage.getItem(folderActive());

    if (typeof getstocks === 'string') {

        const stocks = JSON.parse(getstocks) as Stock[];
        const stockDetails = <stockDetails[]>[];

        for (let stock of stocks) {

            const total_stock = eval(stock.stockNumber);
            const getItem = await getItemById(stock.itemId);
            const item_name = getItem ? getItem?.itemName : 'Item tidak ditemukan';
            stockDetails.push({ ...stock, total_stock, item_name });
        }

        setStocks(stockDetails);
    }

}

export function getStockByFolderId(folderId: string): stockDetails[] {
    return stocks().filter((stock) => stock.folder_id === folderId);
}

export async function removeStockById(stockId: string): Promise<void> {

    const findIndexStock = stocks().findIndex((rec) => rec.stockId === stockId);

    if (findIndexStock > -1) {

        updateFolderCounterById(stocks()[findIndexStock].folder_id, -1)
        setStocks((stocks) => stocks.filter((stock) => stock.stockId !== stockId))

        saveToLocalStorage();
    }
}

export async function getStockById(stockId: string): Promise<Stock | void> {
    const findIndex = stocks().findIndex((rec) => rec.stockId === stockId);

    if (findIndex > -1) {

        return stocks()[findIndex]
    }
}

export async function updateStockById(stockId: string, stockNumber: string, note_stock: string) {
    const newstocks = stocks().map((rec) => {
        if (rec.stockId === stockId) {
            return { ...rec, stockNumber, note_stock }
        }
        return rec
    })

    setStocks(newstocks);
    saveToLocalStorage();
}

export function getResultStock(): ResultStock[] {
    const result = <ResultStock[]>[];

    for (let stock of stocks()) {

        const findIndex = result.findIndex((stockResult) => stockResult.itemId === stock.itemId);

        if (findIndex > -1) {
            result[findIndex].total_stock += eval(stock.stockNumber);
        }

        else {
            result.push({
                item_name: stock.item_name,
                itemId: stock.itemId,
                total_stock: eval(stock.stockNumber)
            })
        }
    }

    return result;
}

function saveToLocalStorage() {
    const getStocks = getStockByFolderId(folderActive())
    const removeUnusedKeyValue: Stock[] = getStocks.map((stock) => ({
        note_stock: stock.note_stock,
        folder_id: stock.folder_id,
        itemId: stock.itemId,
        stockId: stock.stockId,
        stockNumber: stock.stockNumber
    }))

    const stocksState = JSON.stringify(removeUnusedKeyValue);

    localStorage.setItem(folderActive(), stocksState);
}