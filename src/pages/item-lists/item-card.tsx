
import Button from "../../components/Button"

interface Item {
    itemName: string
    itemId: string
}

export default function ItemCard (props: Item) {
  return (
    <div class="item-card">
        <span>{props.itemName}</span>
        <Button color="secondary" text="Edit" />
    </div>
  );
};