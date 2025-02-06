import css from "../css/main.css";
import html from "../index.html";
import svg from "../image/sprite.svg";
import { addForm } from "./Cards/addCard";
import { saveData, loadData } from "./Cards/LocalStorage";
import { dragAndDrop } from "./Cards/DnD";

console.log("JS Init");

document.addEventListener("DOMContentLoaded", function () {
  saveData();
  addForm();
  loadData();
  dragAndDrop();
});
