window.addEventListener("load", initialize);


function initialize() {
   alert('Guten Tag und viel Spass mit der Einkaufsliste :-)');
}

const button = document.getElementById("add-btn");

button.addEventListener("click", function() {
   const input = document.querySelector("input");
   const ul = document.querySelector("ul");

   const li = document.createElement("li");
   li.addEventListener("click", setDone);
   li.textContent = input.value

   ul.appendChild(li);

   input.value = "";
   console.log("button clicked");
}
)

function setDone(e){
   e.target.classList.toggle("done");
}
