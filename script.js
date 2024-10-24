"use strict";

let todos = JSON.parse(localStorage.getItem("todos")) || []; // Hent fra localStorage eller start med tom array
let done = JSON.parse(localStorage.getItem("done")) || []; // Hent fra localStorage eller start med tom array

// Henter alle elementer fra DOM'en
const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.getElementById("list-container");
const doneContainer = document.getElementById("done-container");
let li;

// Når siden indlæses, tilføjes eksisterende todos og done til DOM
todos.forEach((task) => {
  li = document.createElement("li");
  const textNode = document.createTextNode(task);
  li.appendChild(textNode);
  const span = document.createElement("span");
  li.appendChild(span);
  container.appendChild(li);
});

done.forEach((task) => {
  li = document.createElement("li");
  const textNode = document.createTextNode(task);
  li.appendChild(textNode);
  const span = document.createElement("span");
  li.appendChild(span);
  li.classList.add("doneLi");
  doneContainer.appendChild(li);
});

// Event listener til at tilføje nye opgaver
button.addEventListener("click", () => {
  const itemText = input.value.trim();

  if (itemText !== "") {
    todos.push(itemText); // Tilføj til todos-arrayet
    li = document.createElement("li"); // Skab nyt li-element
    const textNode = document.createTextNode(itemText); // Opret textNode med opgaveteksten
    li.appendChild(textNode); // Tilføj textNode til li
    const span = document.createElement("span"); // Opret et span-element
    li.appendChild(span); // Tilføj span til li
    container.appendChild(li); // Tilføj det nye li til containeren (aktive opgaver)

    localStorage.setItem("todos", JSON.stringify(todos)); // Gem todos i localStorage
    input.value = ""; // Tøm input-feltet
  }
});

// Event listener til at håndtere klik på opgaver i todo-listen
container.addEventListener("click", (e) => {
  if (e.target.localName == "span") {
    todos = todos.filter((todo) => todo !== e.target.parentElement.innerText);
    container.removeChild(e.target.parentElement);
    localStorage.setItem("todos", JSON.stringify(todos)); // Opdater localStorage
    return;
  }

  let task = e.target.innerText;
  done.push(task); // Flyt opgave til done
  todos = todos.filter((todo) => todo !== task); // Fjern opgave fra todos

  li = document.createElement("li");
  const textNode = document.createTextNode(task);
  li.appendChild(textNode);
  const span = document.createElement("span");
  li.appendChild(span);
  li.classList.add("doneLi");
  doneContainer.appendChild(li);

  localStorage.setItem("todos", JSON.stringify(todos)); // Opdater localStorage for todos
  localStorage.setItem("done", JSON.stringify(done)); // Opdater localStorage for done
  container.removeChild(e.target); // Fjern elementet fra todo-listen
});

// Event listener til at håndtere klik på opgaver i done-listen
doneContainer.addEventListener("click", (e) => {
  if (e.target.localName == "span") {
    done = done.filter((todo) => todo !== e.target.parentElement.innerText);
    doneContainer.removeChild(e.target.parentElement);
    localStorage.setItem("done", JSON.stringify(done)); // Opdater localStorage for done
    return;
  }

  let task = e.target.innerText;
  todos.push(task); // Flyt opgave tilbage til todos
  done = done.filter((todo) => todo !== task); // Fjern opgave fra done

  li = document.createElement("li");
  const textNode = document.createTextNode(task);
  li.appendChild(textNode);
  const span = document.createElement("span");
  li.appendChild(span);
  container.appendChild(li);

  localStorage.setItem("todos", JSON.stringify(todos)); // Opdater localStorage for todos
  localStorage.setItem("done", JSON.stringify(done)); // Opdater localStorage for done
  doneContainer.removeChild(e.target); // Fjern elementet fra done-listen
});
