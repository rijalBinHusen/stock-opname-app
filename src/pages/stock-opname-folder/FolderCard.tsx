
import Button from "../../components/Button"

interface Item {
    folderName: string
    folderId: string
    folderCounter: number
    editFolder: Function
    duplicateFolder: Function
}

export default function ItemCard (props: Item) {
  return (
    <div class="item-card item-card-pointer">
          <span>{ props.folderName }</span>
          <div>

            <span class="badge">{ props.folderCounter }</span>
            <Button color="secondary" text="Edit" onClick={ () => props.editFolder(props.folderId)} />
            <Button color="secondary" text="❏" onClick={ () => props.duplicateFolder(props.folderId)} />
            {/* <button class="button-duplicate" onClick={ () => props.editFolder(props.folderId)}></button> */}
          </div>
        </div>
  );
};