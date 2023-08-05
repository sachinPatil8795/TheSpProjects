//The Candy Shop

const URL =
  "https://crudcrud.com/api/e6dbe3ded1654598915b05a2959c034d/candyStore";

//Adding event listner on submit button
const addCandy = document.querySelector("#candy-form");
addCandy.addEventListener("submit", addCandyToStore);

async function addCandyToStore(e) {
  e.preventDefault();

  // Get form values
  const candyName = document.getElementById("CandyName").value;
  const description = document.getElementById("des").value;
  const price = parseFloat(document.getElementById("candyPrice").value);
  const quantity = parseInt(document.getElementById("qty").value);

  // Create candy object
  const candyData = {
    name: candyName,
    description: description,
    price: price,
    quantity: quantity,
  };

  //Adding candies to our store

  try {
    const res = await axios.post(URL, candyData); //POST request
    createCandyShop();
  } catch (err) {
    console.log(err);
  }

  //Clear form input fields
  document.getElementById("CandyName").value = "";
  document.getElementById("des").value = "";
  document.getElementById("candyPrice").value = "";
  document.getElementById("qty").value = "";
}

//Function to get candy from store
async function getCandyFromStore() {
  try {
    const response = await axios.get(URL); //GET request
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

//function to display candies in store

async function createCandyShop() {
  const candyStore = await getCandyFromStore(); // Storing all request

  const candyTable = document
    .getElementById("candy-table")
    .getElementsByTagName("tbody")[0];

  //Inserting candy data in table body
  let tableBody = "";
  candyStore.forEach((candy) => {
    tableBody += `
                <tr>
                    <td>${candy.name}</td>
                    <td>${candy.description}</td>
                    <td>${candy.price}</td>
                    <td>${candy.quantity}</td>
                    <td>
                        <button class="btn btn-sm btn-success" onclick="reduceCandyQuantityByOne('${candy._id}')">Buy1</button>
                        <button class="btn btn-sm btn-success" onclick="reduceCandyQuantityByTwo('${candy._id}')">Buy2</button>
                        <button class="btn btn-sm btn-success" onclick="reduceCandyQuantityByThree('${candy._id}')">Buy3</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteCandyData('${candy._id}')">X</button>
                    </td>
                </tr>`;
  });

  candyTable.innerHTML = tableBody;
}

//function to  delete candy from store

async function deleteCandyData(candyId) {
  try {
    // Send DELETE request to remove candyData from the server
    const res = await axios.delete(`${URL}/${candyId}`); //DELETE request
    console.log(res);
    createCandyShop();
  } catch (err) {
    console.log(err);
  }
}

//function to reduce Candy quantity by one

async function reduceCandyQuantityByOne(candyId) {
  const candyStore = await getCandyFromStore();

  const candyToUpdate = candyStore.find((candy) => candy._id === candyId);

  if (candyToUpdate.quantity > 0) {
    candyToUpdate.quantity--;

    let updateCandy = {
      name: candyToUpdate.name,
      description: candyToUpdate.description,
      price: candyToUpdate.price,
      quantity: candyToUpdate.quantity,
    };

    // Send PUT request to update candyData on the server
    try {
      const updateResponse = await axios.put(`${URL}/${candyId}`, updateCandy);
      console.log(updateResponse);

      createCandyShop();
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("No more candies at store");
  }
}

//function to reduce Candy quantity by two

async function reduceCandyQuantityByTwo(candyId) {
  const candyStore = await getCandyFromStore();

  const candyToUpdate = candyStore.find((candy) => candy._id === candyId);

  if (candyToUpdate.quantity > 0) {
    candyToUpdate.quantity -= 2;

    let updateCandy = {
      name: candyToUpdate.name,
      description: candyToUpdate.description,
      price: candyToUpdate.price,
      quantity: candyToUpdate.quantity,
    };

    // Send PUT request to update candyData on the server
    try {
      const updateResponse = await axios.put(`${URL}/${candyId}`, updateCandy);
      console.log(updateResponse);

      createCandyShop();
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("No more candies at store");
  }
}

//function to reduce Candy quantity by three

async function reduceCandyQuantityByThree(candyId) {
  const candyStore = await getCandyFromStore();

  const candyToUpdate = candyStore.find((candy) => candy._id === candyId);

  if (candyToUpdate.quantity > 0) {
    candyToUpdate.quantity -= 3;
    // console.log(candyToUpdate);
    // console.log(candyId);

    let updateCandy = {
      name: candyToUpdate.name,
      description: candyToUpdate.description,
      price: candyToUpdate.price,
      quantity: candyToUpdate.quantity,
    };

    // Send PUT request to update candyData on the server
    try {
      const updateResponse = await axios.put(`${URL}/${candyId}`, updateCandy);
      console.log(updateResponse);

      createCandyShop();
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("No more candies at store");
  }
}

createCandyShop();

//Filter event
const tableList = document.querySelector("#list-items");
const filter = document.querySelector("#filter");
filter.addEventListener("keyup", filterItems);

// Filter Items

function filterItems(e) {
  // convert text to lowercase
  // console.log(e.target);
  var text = e.target.value.toLowerCase();

  // Get td
  var items = tableList.getElementsByTagName("td");

  // Convert to an array
  Array.from(items).forEach((item) => {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
