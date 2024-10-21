"use strict";

let Checked = [];
let notFinished = [];


//henter alle mine elementer//
const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.getElementById("list-container");

const ul = document.createElement("ul"); //laver en ul//
container.appendChild(ul); //sætter min ul ind i min container/appender til containeren//

button.addEventListener("click", () => { //tilføjer eventlistener til min button//
    const itemText = input.value; //får værdien af inputfeltet//
    if (itemText.trim() !== " " ){ //tjekker om value er tom//
        const li = document.createElement("li"); //skaber nyt li element//
        const textNode = document.createTextNode(itemText); //skaber textNode//
        li.appendChild(textNode); //appender textNode til li elementet//
        ul.appendChild(li); //appender det nye li element til listen (ul)//
        input.value = (""); //sørger for at input feltet bliver tomt//
    }
});

function toggleChecked() {
    var li = document.querySelector("li");
    li.classList.toggle("checked");
  }

