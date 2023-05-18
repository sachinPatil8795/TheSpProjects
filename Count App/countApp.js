let saveEl = document.getElementById("save-el");
let counter = 0;
function countPlayers() {
  counter += 1;
  document.getElementById("count-item").textContent = counter;
}

function save() {
  const myEntries = counter + " - ";
  saveEl.textContent += myEntries;

  console.log("Number of players playing:");
  console.log(counter);

  counter = 0;
  document.getElementById("count-item").textContent = counter;
}
