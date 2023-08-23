import { createSignal } from "solid-js";

export interface Item {
    itemId: string
    itemName: string
}
  
  const state = <Item[]>[];
  const localStorageName = "item";

export const [items, setItem] = createSignal(state);

export async function addItem(itemName: string): Promise<void> {

    const itemId = items().length + 1 + '';
    
    if(items.length === 0) { await getItems(); };
    
    setItem((items) => [...items, { itemId, itemName }]);

    saveToLocalStorage();
}

export async function getItems(): Promise<void> {

    const getItems = localStorage.getItem(localStorageName);

    if(typeof getItems === 'string') {

        const items = JSON.parse(getItems) as Item[];

        setItem(items);
    }
}

function saveToLocalStorage() {
    const itemsState = JSON.stringify(items());

    localStorage.setItem(localStorageName, itemsState);
}