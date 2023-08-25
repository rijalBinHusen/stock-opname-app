import { createSignal } from "solid-js";

type page = "home"|"item"|"stock";
  
const currentPage = <page|"home">;

export const [page, setPage] = createSignal(currentPage);