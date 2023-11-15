import { describe, it, expect } from "vitest";
import { addItem, getItemById, getItems, updateItemById, items } from "./function";

describe('Item services', () => {
    const itemNameToSet = "newItem";
    const itemNameToUpdate = "updatedItem"
    let itemId = "";

    it("Should be return item id", async () => {
        itemId = await addItem(itemNameToSet);

        await getItems();

        expect(items()[0].itemName).equal(itemNameToSet);
    })

    it("Item should be updated", async () => {
        await updateItemById(itemId, itemNameToUpdate);

        const getUpdatedItem = await getItemById(itemId);

        expect(getUpdatedItem?.itemName).equal(itemNameToUpdate);
    })


})