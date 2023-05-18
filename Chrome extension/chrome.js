let myLeads = [];
let oldLeads = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

//Check if leadsFromLocalStorage is truthy
if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

deleteBtn.addEventListener("dblclick", function (){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function(event) {
  event.preventDefault();
  myLeads.push(inputEl.value);
  console.log(myLeads);
  render(myLeads);
  inputEl.value = "";
  //Saving myLeads array to local storage
  localStorage.setItem("myLeads",JSON.stringify(myLeads));
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
    listItems += `
    <li>
        <a href = "https://${leads[i]}" target = "_blank">
          ${leads[i]}
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

