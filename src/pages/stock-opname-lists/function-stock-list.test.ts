import { describe, expect, it } from "vitest";
import { addStock, getStocks, setCurrentStock, removeStockById, getStockById, stocks } from "./function";
import { faker } from "@faker-js/faker"
import { addItem } from "../item-lists/function";
import { addFolder, getFolderById, setFolderActive } from "../stock-opname-folder/function";

describe("Stock list service", async () => {
    
    const itemsId = <string[]>[];
    const foldersId = <string[]>[];
    const stocksId = <string[]>[];
    // create items and folders
    for(let i = 0; i < 10; i++) {

        const idItem = await addItem(faker.animal.bird());
        const idFolder = await addFolder(faker.animal.bear());
        
        itemsId.push(idItem);
        foldersId.push(idFolder);
    }

    it("It should be create new stock and return id", async () => {
        for(let i = 0; i < 1000; i++) {
            const indexItemOrFolder = i % 10;
            const itemId = itemsId[indexItemOrFolder];
            const folderId = foldersId[indexItemOrFolder];

            const getFolderInfo = await getFolderById(folderId);

            const idStock = await addStock(itemId, faker.number.int({min: 300}) + '', folderId, "no-date")
            stocksId.push(idStock);

            const getFolderInfoAfterAddStock = await getFolderById(folderId);
            expect( getFolderInfoAfterAddStock?.folderCounter ).equal(Number(getFolderInfo?.folderCounter) + 1)

            // remove stock
            // get folder by id
            // the folder counter must be match
        }
    })

    it("Set folder active and the counter must be 10", async () => {
        
        for(let folderId of foldersId) {

            setFolderActive(folderId);
            await getStocks();

            const getFolderInfo = await getFolderById(folderId);
            expect(getFolderInfo?.folderCounter).equal(100);
            // expect(stocks().length).equal(100);

        }
    })
})