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
  apiKey: "AIzaSyC7cBhgG19WmkiTHZWIzGouoPD66ssI0mE",
  authDomain: "product-80da8.firebaseapp.com",
  databaseURL: "https://product-80da8-default-rtdb.firebaseio.com",
  projectId: "product-80da8",
  storageBucket: "product-80da8.appspot.com",
  messagingSenderId: "485102845839",
  appId: "1:485102845839:web:90a44bcfd346f58d1395fa",
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
