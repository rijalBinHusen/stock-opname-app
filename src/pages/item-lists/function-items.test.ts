import { describe, it, expect } from "vitest";
import { addItem, getItemById, getItems, updateItemById, items } from "./function";
import { faker } from "@faker-js/faker"

describe('Item services', () => {
    const itemNameToSet = <string[]>[];
    let itemId = <string[]>[];

    for(let i =0; i < 10; i++) {
        itemNameToSet.push(faker.animal.fish())
    }

    it("Should be return item id", async () => {

        for(let itemName of itemNameToSet) {
            const itemIdCreated = await addItem(itemName);
            itemId.push(itemIdCreated)
        }

        await getItems();

        expect(itemId.length).equal(itemNameToSet.length);
        expect(items().length).equal(itemNameToSet.length);
    })

    it("Item should be updated", async () => {

        for(let idItem of itemId) {
            const itemNameToUpdate = faker.animal.bird();

            await updateItemById(idItem, itemNameToUpdate);
            const getUpdatedItem = await getItemById(idItem);
    
            expect(getUpdatedItem?.itemName).equal(itemNameToUpdate);
        }
    })


})