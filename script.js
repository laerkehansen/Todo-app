"use strict"; // Tvinger koden til at køre i "strict mode", hvilket hjælper med at undgå visse fejl, f.eks. utilsigtede globale variabler.

let todos = JSON.parse(localStorage.getItem("todos")) || []; // Hent "todos" fra localStorage og omdanner til array. Hvis ingen data findes, bruges et tomt array.
let done = JSON.parse(localStorage.getItem("done")) || []; // Hent "done" fra localStorage og omdanner til array. Hvis ingen data findes, bruges et tomt array.

// Henter HTML-elementer fra DOM'en ved hjælp af querySelector og getElementById
const button = document.querySelector("button"); // Finder "button"-elementet i DOM'en
const input = document.querySelector("input"); // Finder "input"-elementet i DOM'en
const container = document.getElementById("list-container"); // Finder "list-container" elementet, hvor todos vil blive vist
const doneContainer = document.getElementById("done-container"); // Finder "done-container" elementet, hvor færdige opgaver vises
let li; // Opretter en variabel, der skal bruges til at skabe nye "li"-elementer senere

// Når siden indlæses, tilføjes eksisterende "todos" til DOM'en
todos.forEach((task) => { // Løkke gennem alle opgaver i "todos"-arrayet
  li = document.createElement("li"); // Opretter et nyt "li"-element
  const textNode = document.createTextNode(task); // Opretter en tekstnode med opgaveteksten
  li.appendChild(textNode); // Tilføjer teksten til "li"-elementet
  const span = document.createElement("span"); // Opretter et tomt "span"-element
  li.appendChild(span); // Tilføjer "span" til "li" (til senere brug som klikbare områder)
  container.appendChild(li); // Tilføjer "li"-elementet til "list-container", så det vises på siden
});

// Når siden indlæses, tilføjes eksisterende "done"-opgaver til DOM'en
done.forEach((task) => { // Løkke gennem alle opgaver i "done"-arrayet
  li = document.createElement("li"); // Opretter et nyt "li"-element
  const textNode = document.createTextNode(task); // Opretter en tekstnode med opgaveteksten
  li.appendChild(textNode); // Tilføjer teksten til "li"-elementet
  const span = document.createElement("span"); // Opretter et tomt "span"-element
  li.appendChild(span); // Tilføjer "span" til "li"
  li.classList.add("doneLi"); // Tilføjer en CSS-klasse for at vise, at opgaven er færdig
  doneContainer.appendChild(li); // Tilføjer "li"-elementet til "done-container", så det vises på siden
});

// Event listener, der håndterer klik på "Tilføj opgave"-knappen
button.addEventListener("click", () => {
  const itemText = input.value.trim(); // Fjerner unødvendige mellemrum fra indtastet tekst

  if (itemText !== "") { // Hvis input-feltet ikke er tomt
    todos.push(itemText); // Tilføjer opgaven til "todos"-arrayet
    li = document.createElement("li"); // Opretter et nyt "li"-element
    const textNode = document.createTextNode(itemText); // Opretter en tekstnode med opgaveteksten
    li.appendChild(textNode); // Tilføjer teksten til "li"-elementet
    const span = document.createElement("span"); // Opretter et "span"-element
    li.appendChild(span); // Tilføjer "span" til "li"-elementet
    container.appendChild(li); // Tilføjer det nye "li"-element til "list-container"
    localStorage.setItem("todos", JSON.stringify(todos)); // Gemmer den opdaterede "todos"-array i localStorage
    input.value = ""; // Tømmer input-feltet, efter at opgaven er tilføjet
  }
});

// Event listener til klik på elementer i todo-listen
container.addEventListener("click", (e) => {
  if (e.target.localName == "span") { // Hvis der klikkes på et "span"-element
    todos = todos.filter((todo) => todo !== e.target.parentElement.innerText); // Fjerner den valgte opgave fra "todos"-arrayet
    container.removeChild(e.target.parentElement); // Fjerner det tilhørende "li"-element fra DOM'en
    localStorage.setItem("todos", JSON.stringify(todos)); // Opdaterer localStorage med det ændrede "todos"-array
    return; // Stopper funktionen her, hvis det er et "span"-klik (opgave slettet)
  }

  let task = e.target.innerText; // Henter teksten fra den klikbare opgave
  done.push(task); // Tilføjer opgaven til "done"-arrayet
  todos = todos.filter((todo) => todo !== task); // Fjerner opgaven fra "todos"-arrayet
  li = document.createElement("li"); // Opretter et nyt "li"-element til opgaven i done-listen
  const textNode = document.createTextNode(task); // Opretter en tekstnode med opgaveteksten
  li.appendChild(textNode); // Tilføjer teksten til "li"-elementet
  const span = document.createElement("span"); // Opretter et "span"-element
  li.appendChild(span); // Tilføjer "span" til "li"-elementet
  li.classList.add("doneLi"); // Tilføjer en CSS-klasse til at markere opgaven som færdig
  doneContainer.appendChild(li); // Tilføjer opgaven til "done-container"
  localStorage.setItem("todos", JSON.stringify(todos)); // Opdaterer localStorage med det opdaterede "todos"-array
  localStorage.setItem("done", JSON.stringify(done)); // Opdaterer localStorage med det opdaterede "done"-array
  container.removeChild(e.target); // Fjerner opgaven fra todo-listen i DOM'en
});

// Event listener til klik på elementer i done-listen
doneContainer.addEventListener("click", (e) => {
  if (e.target.localName == "span") { // Hvis der klikkes på et "span"-element i done-listen
    done = done.filter((todo) => todo !== e.target.parentElement.innerText); // Fjerner opgaven fra "done"-arrayet
    doneContainer.removeChild(e.target.parentElement); // Fjerner det tilhørende "li"-element fra DOM'en
    localStorage.setItem("done", JSON.stringify(done)); // Opdaterer localStorage med det ændrede "done"-array
    return; // Stopper funktionen her, hvis det er et "span"-klik (opgave slettet)
  }

  let task = e.target.innerText; // Henter teksten fra den klikbare opgave i done-listen
  todos.push(task); // Tilføjer opgaven tilbage til "todos"-arrayet (flyttes fra done)
  done = done.filter((todo) => todo !== task); // Fjerner opgaven fra "done"-arrayet
  li = document.createElement("li"); // Opretter et nyt "li"-element til todo-listen
  const textNode = document.createTextNode(task); // Opretter en tekstnode med opgaveteksten
  li.appendChild(textNode); // Tilføjer teksten til "li"-elementet
  const span = document.createElement("span"); // Opretter et "span"-element
  li.appendChild(span); // Tilføjer "span" til "li"-elementet
  container.appendChild(li); // Tilføjer det nye "li"-element til "list-container" (todo-listen)
  localStorage.setItem("todos", JSON.stringify(todos)); // Opdaterer localStorage med det opdaterede "todos"-array
  localStorage.setItem("done", JSON.stringify(done)); // Opdaterer localStorage med det opdaterede "done"-array
  doneContainer.removeChild(e.target); // Fjerner opgaven fra done-listen i DOM'en
});
