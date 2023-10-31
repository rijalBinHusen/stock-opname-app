
import Button from "../../components/Button"

interface Item {
    folderName: string
    folderId: string
    folderCounter: number
    editFolder: Function
    duplicateFolder: Function
    chooseFolder: Function
}

export default function ItemCard (props: Item) {
  return (
    <div class="item-card item-card-pointer" onClick={() => props.chooseFolder(props.folderId)}>
          <span>{ props.folderName }</span>
          <div>

            <span class="badge">{ props.folderCounter }</span>
            <Button color="secondary" text="Edit" onClick={ () => props.editFolder(props.folderId)} />
            <Button color="secondary" text="❏ Gandakan" onClick={ () => props.duplicateFolder(props.folderId)} />
          </div>
        </div>
  );
};