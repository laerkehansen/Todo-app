"use strict";

let todos = [];
let done = [];
//jj
//henter alle mine elementer//
const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.getElementById("list-container");
const doneContainer = document.getElementById("done-container");

button.addEventListener("click", () => {
  //tilføjer eventlistener til min button//
  const itemText = input.value.trim(); //får værdien af inputfeltet//

  if (itemText.trim() !== "") {
    const task = todos.push(itemText);
    console.log("todos: ", todos);
    const li = document.createElement("li"); //skaber nyt li element//
    const textNode = document.createTextNode(itemText); //skaber textNode//
    li.appendChild(textNode); //appender textNode til li elementet//
    container.appendChild(li); //appender det nye li element til listen (ul)//
    input.value = ""; //sørger for at input feltet bliver tomt//
  }
});

container.addEventListener("click", (e) => {
  console.log(e);
  let task = e.target.innerText;
  done.push(task);
  todos = todos.filter(function (todo) {
    return todo !== task;
  });
  console.log("Done: ", done);
  console.log("Todos: ", todos);

  const li = document.createElement("li");
  const textNode = document.createTextNode(task);
  li.appendChild(textNode);

  // Tilføj CSS-klasse "done" for at ændre ::before baggrund
  li.classList.add("doneLi");
  doneContainer.appendChild(li);
  container.removeChild(e.target);
});

doneContainer.addEventListener("click", (e) => {
  let task = e.target.innerText;
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
