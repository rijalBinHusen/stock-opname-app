import { describe, expect, it } from "vitest";
import { addFolder, folderActive, folders, getFolderById, getFolders, setFolderActive, updateFolderCounterById, updateFolderNameById } from "./function";
import { faker } from "@faker-js/faker";

describe('Stock folder services', () => {
    const folderNames = <string[]>[];
    const folderIds = <string[]>[];

    for(let i = 0; i < 10; i++) {
        folderNames.push(faker.color.rgb())
    }

    it("Should be create new folder with name and return id", async () => {
        for(let folderName of folderNames) {
            const folderIdCreated = await addFolder(folderName);
            folderIds.push(folderIdCreated);
        }

        await getFolders();

        expect(folderIds.length).equal(folderNames.length);
        expect(folders().length).equal(folderIds.length);
    })

    it("Folder name should be updated", async () => {
        for(let folderId of folderIds) {
            const folderNameToUpdate = faker.animal.bird();

            await updateFolderNameById(folderId, folderNameToUpdate);
            const getUpdatedFolder = await getFolderById(folderId);

            expect(getUpdatedFolder?.folderName).equal(folderNameToUpdate);
        }
    })
})