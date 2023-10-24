import { createSignal } from "solid-js";
import { getItemById } from "../item-lists/function";

export interface Stock {
    stockId: string
    itemId: string
    height_stock: number
    width_stock: number
    length_stock: number
    hole_stock: number
    addition_stock: number
    folder_id: string
}

export interface stockDetails extends Stock {
    total_stock: number
    item_name: string
}
  
  const state = <stockDetails[]>[];
  const localStorageName = "stock";

export const [stocks, setStocks] = createSignal(state);

export async function addStock(itemId: string, height_stock: number, width_stock: number, length_stock: number, hole_stock: number, addition_stock: number, folder_id: string): Promise<void> {

    const stockId = stocks().length + 1 + '';
    
    if(stocks.length === 0) { await getstocks(); };

    const total_stock = (height_stock * width_stock * length_stock) + addition_stock - hole_stock;
    const getItem = await getItemById(itemId)
    const item_name = getItem ? getItem?.itemName : 'Item tidak ditemukan';
    
    setStocks((stocks) => [{
        stockId, 
        itemId, 
        height_stock,
        width_stock,
        length_stock,
        hole_stock,
        addition_stock,
        total_stock,
        item_name,
        folder_id
    }, ...stocks]);

    saveToLocalStorage();
}

export async function getstocks(): Promise<void> {
    
    if(stocks.length > 0) return;

    const getstocks = localStorage.getItem(localStorageName);

    if(typeof getstocks === 'string') {

        const stocks = JSON.parse(getstocks) as stockDetails[];

        setStocks(stocks);
    }
}

export function getStockByFolderId(folderId: string): stockDetails[] {
    return stocks().filter((stock) => stock.folder_id === folderId);
}

// export async function getFolderById(folderId: string): Promise<Stock|void> {
//     const findIndex = stocks().findIndex((rec) => rec.stockId === folderId);

//     if(findIndex > -1) {

//         return stocks()[findIndex]
//     }
// }

// export async function updateFolderNameById(folderId: string, folderName: string) {
//     const newstocks = stocks().map((rec) => {
//         if(rec.stockId === folderId) {
//             return { ...rec, folderName }
//         }
//         return rec
//     })

//     setstocks(newstocks);
//     saveToLocalStorage();
// }

// export async function updateFolderCounterById(folderId: string, folderCounter: number) {
//     const newstocks = stocks().map((rec) => {
//         if(rec.folderId === folderId) {
//             return { ...rec, folderCounter }
//         }
//         return rec
//     })

//     setstocks(newstocks);
//     saveToLocalStorage();
// }

function saveToLocalStorage() {
    const itemsState = JSON.stringify(stocks());

    localStorage.setItem(localStorageName, itemsState);
}