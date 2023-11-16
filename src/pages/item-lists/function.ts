import { createSignal } from "solid-js";

export interface Item {
    itemId: string
    itemName: string
}
  
  const state = <Item[]>[];
  const localStorageName = "item";

export const [items, setItem] = createSignal(state);

export async function addItem(itemName: string): Promise<string> {

    const itemId = items().length + 1 + '';
    
    if(items.length === 0) { await getItems(); };
    
    setItem((items) => [{ itemId, itemName }, ...items]);

    saveToLocalStorage();

    return itemId;
}

export async function getItems(): Promise<void> {
    
    if(items.length > 0) return;

    const getItems = localStorage.getItem(localStorageName);

    if(typeof getItems === 'string') {

        const items = JSON.parse(getItems) as Item[];

        setItem(items);
    }
}

export async function getItemById(itemId: string): Promise<Item|void> {

    if(items().length === 0) await getItems();
    
    const findIndex = items().findIndex((rec) => rec.itemId === itemId);

    if(findIndex > -1) {

        return items()[findIndex]
    }
}

export async function updateItemById(itemId: string, itemName: string) {
    const newItems = items().map((rec) => {
        if(rec.itemId === itemId) {
            return { itemId, itemName }
        }
        return rec
    })

    setItem(newItems);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const itemsState = JSON.stringify(items());

    localStorage.setItem(localStorageName, itemsState);
}