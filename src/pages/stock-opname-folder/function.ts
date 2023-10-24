import { createSignal } from "solid-js";

export interface Folder {
    folderId: string
    folderName: string
    folderCounter: number
}
  
const state = <Folder[]>[];
const localStorageName = "stock-folder";
export const [folderActive, setFolderActive] = createSignal("");

export const [folders, setFolders] = createSignal(state);

export async function addFolder(folderName: string): Promise<void> {

    const folderId = folders().length + 1 + '';
    
    if(folders.length === 0) { await getFolders(); };
    
    setFolders((folders) => [{ folderId, folderName, folderCounter: 0 }, ...folders]);

    saveToLocalStorage();
}

export async function getFolders(): Promise<void> {
    
    if(folders.length > 0) return;

    const getFolders = localStorage.getItem(localStorageName);

    if(typeof getFolders === 'string') {

        const folders = JSON.parse(getFolders) as Folder[];

        setFolders(folders);
    }
}

export async function getFolderById(folderId: string): Promise<Folder|void> {
    const findIndex = folders().findIndex((rec) => rec.folderId === folderId);

    if(findIndex > -1) {

        return folders()[findIndex]
    }
}

export async function updateFolderNameById(folderId: string, folderName: string) {
    const newfolders = folders().map((rec) => {
        if(rec.folderId === folderId) {
            return { ...rec, folderName }
        }
        return rec
    })

    setFolders(newfolders);
    saveToLocalStorage();
}

export async function updateFolderCounterById(folderId: string, folderCounter: number) {
    const newfolders = folders().map((rec) => {
        if(rec.folderId === folderId) {
            return { ...rec, folderCounter }
        }
        return rec
    })

    setFolders(newfolders);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const itemsState = JSON.stringify(folders());

    localStorage.setItem(localStorageName, itemsState);
}