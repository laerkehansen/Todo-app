"use strict";

let todos = [];
let done = [];
//jj
//henter alle mine elementer//
const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.getElementById("list-container");
const doneContainer = document.getElementById("done-container");
let li;
// ??? li

button.addEventListener("click", () => {
  //tilføjer eventlistener til min button//
  const itemText = input.value.trim(); //siger værdien er input er lige med itemtext
  // trim?? vi fiskede med patting

  if (itemText.trim() !== "") {
    const task = todos.push(itemText); //skupper værdien er input in i arry
    console.log("todos: ", todos);

    li = document.createElement("li"); //skaber nyt li element//
    const textNode = document.createTextNode(itemText); //skaber textNode//

    li.appendChild(textNode); //vedhæfter textNode til li
    const span = document.createElement("span"); // her laver vi ny span hvergang man klike på knap
    li.appendChild(span); // vedhæfter span til li
    container.appendChild(li); //vedhæfter li til container som er en ul
    input.value = ""; // Sørger for, at input-feltet bliver tomt
  }
});

// Tilføjer en eventlistener til "container" (ul-elementet med opgaver), der reagerer på klik.
container.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.localName == "span") {
    // Hvis der klikkes på et span-element (sletning af opgave).
    todos = todos.filter((todo) => todo !== e.target.parentElement.innerText); // Fjerner opgaven fra "todos".
    // container.removeChild(e.target.parentElement); // Fjerner det tilsvarende li-element fra "container".
    console.log("span", e.target.localName);
    return; // Afslutter funktionen efter opgaven er slettet.
  }
  let task = e.target.innerText; // Får teksten (opgaven) fra det li-element, der blev klikket på.
  done.push(task); // Tilføjer opgaven til "done" arrayet.
  todos = todos.filter(function (todo) {
    // Fjerner opgaven fra "todos" arrayet.
    return todo !== task;
  });
  console.log("Done: ", done);
  console.log("Todos: ", todos);
  // over i done container
  // laver elemnter
  const li = document.createElement("li"); // Opretter et nyt li-element.
  const textNode = document.createTextNode(task); // Opretter en tekstnode med opgaveteksten.
  const span = document.createElement("span"); // her laver vi ny span hvergang man klike på knap
  // samler elmter
  li.appendChild(span); // vedhæfter span til li
  li.appendChild(textNode); // Vedhæfter tekstnoden til det nye li-element.
  li.classList.add("doneLi"); // Tilføjer CSS-klasse "doneLi" for at style det som en færdig opgave.
  doneContainer.appendChild(li); // Tilføjer det nye li-element til "doneContainer" (færdige opgaver)
  // fjerner elmenter
  container.removeChild(e.target); // Fjerner li-elementet fra "container" (ikke-udførte opgaver).

  // laver span
});

// Tilføjer en eventlistener til "doneContainer" (ul) (ul-elementet for færdige opgaver), der reagerer på klik.
doneContainer.addEventListener("click", (e) => {
  if (e.target.localName == "span") {
    // Hvis der klikkes på et span-element (sletning af opgave).
    todos = todos.filter((todo) => todo !== e.target.parentElement.innerText); // Fjerner opgaven fra "todos".
    container.removeChild(e.target.parentElement); // Fjerner det tilsvarende li-element fra "container".
    return; // Afslutter funktionen efter opgaven er slettet.
  }
  let task = e.target.innerText; // Får teksten (opgaven) fra det li-element, der blev klikket på.
  todos.push(task);
  done = done.filter(function (todo) {
    return todo !== task;
  });
  console.log("Done 3: ", done);
  console.log("Todos 3: ", todos);
  const li = document.createElement("li");
  const textNode = document.createTextNode(task);
  li.appendChild(textNode);
  container.appendChild(li);
  doneContainer.removeChild(e.target);
});
