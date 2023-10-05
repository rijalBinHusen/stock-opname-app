import { createSignal } from "solid-js";

type page = "home"|"item"|"stock";
  
let currentPage:page;

export const [page, setPage] = createSignal(currentPage = "home");