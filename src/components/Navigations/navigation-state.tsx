import { createSignal } from "solid-js";
  
export const [page, setPage] = createSignal<"home"|"item"|"stock"|"folder"|"stock-list"|"stock-add">("home");