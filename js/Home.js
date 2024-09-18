// Import the functions you need from the SDKs you need

import {
  get,
  getDatabase,
  set,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
let input = document.getElementsByTagName("input");
let product = document.getElementById("product");
let description = document.getElementById("description");
let ingredient = document.getElementById("ingredient");
let image = document.getElementById("image");
let select = document.getElementById("select");
let price = document.getElementById("price");
let login_btn = document.getElementById("login_btn");
let username = JSON.parse(localStorage.getItem("users")).username;
login_btn.innerText = username;

//add
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let productID = window.uuidv4();
  console.log(productID);
  set(ref(database, "AllProduct/" + productID), {
    productID,
    product: product.value,
    description: description.value,
    ingredient: ingredient.value,
    select: select.value,
    image: image.value,
    price: price.value,
  }).then(() => {
    alert("add success");
    for (let i = 0; i < input.length; i++) {
      input[i].value = "";
    }
  });
});
