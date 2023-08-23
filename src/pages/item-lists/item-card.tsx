import type { Component } from 'solid-js';

interface Item {
    itemName: string
    itemId: string
}

export default function ItemCard (props: Item) {
  return (
    <div class="item-card">
        <span>{props.itemName}</span>
        <button class="button secondary-color">Edit</button>
    </div>
  );
};