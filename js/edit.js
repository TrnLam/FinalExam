import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9Q7PyiXHv0ivY9eF9uZRhn9JnyOO7ks4",
  authDomain: "product2-f4554.firebaseapp.com",
  databaseURL: "https://product2-f4554-default-rtdb.firebaseio.com",
  projectId: "product2-f4554",
  storageBucket: "product2-f4554.appspot.com",
  messagingSenderId: "843173928034",
  appId: "1:843173928034:web:79d23c2293a64e3899453b",
  measurementId: "G-TMF1QHFK6Z",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let submit = document.getElementById("submit");
let product = document.getElementById("product");
let description = document.getElementById("description");
let ingredient = document.getElementById("ingredient");
let image = document.getElementById("image");
let select = document.getElementById("select");
let price = document.getElementById("price");
let oldData = JSON.parse(localStorage.getItem("data"));

console.log(oldData);
console.log(oldData.productID);
//applied old data
product.value = oldData.product;
description.value = oldData.description;
ingredient.value = oldData.ingredient;
price.value = oldData.price;
image.value = oldData.image;
select.value = oldData.select;
//new data
submit.addEventListener("click", (e) => {
  e.preventDefault();
  update(ref(database, "AllProduct/" + oldData.productID), {
    productID: oldData.productID,
    product: product.value,
    description: description.value,
    ingredient: ingredient.value,
    select: select.value,
    image: image.value,
    price: price.value,
  }).then(() => {
    alert("edit success");
    window.location.href = "index.html";
  });
});
