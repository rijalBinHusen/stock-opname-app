import { createSignal } from "solid-js";

type page = "home"|"item"|"stock"|"folder";
  
let currentPage:page;

export const [page, setPage] = createSignal(currentPage = "home");