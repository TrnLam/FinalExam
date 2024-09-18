// Import the functions you need from the SDKs you need

import {
  get,
  update,
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

let cartcontainer = document.getElementById("cartcontainer");
let login_btn = document.getElementById("login_btn");
let username = JSON.parse(localStorage.getItem("users")).username;
login_btn.innerText = username;
let Usercart = JSON.parse(localStorage.getItem("currentUser")).cart;

console.log(Usercart);

onValue(ref(database, "AllProduct"), (snap) => {
  let data = snap.val();
  data = Object.values(data);
  console.log(data);

  renderCart(data, Usercart);
});

function renderCart(data, Usercart) {
  for (let i = 1; i < Usercart.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (Usercart[i].productID == data[j].productID) {
        console.log(data[j]);
        console.log(Usercart[i]);
        renderPro(data[j], Usercart[i]);
      }
    }
  }
}

function renderPro(data, Usercart) {
  let productcard = document.createElement("div");
  productcard.className = "productcard";
  productcard.innerHTML = `
  
          <div class="img">
            <img
              src="${data.image}
            "
              alt=""
            />
          </div>
          <div class="first">
            <div class="product_name">${data.product}</div>
            <div class="product_description">${data.description}</div>
            <div class="product_ingredient">${data.ingredient}</div>
            <div class="product_type">${data.select}</div>
          </div>
          <div class="second">
            <div class="product_quantity">Amount: ${Usercart.quantity}</div>
            <div class="product_price">${data.price}$/1cup</div>
          </div>
        
  `;
  cartcontainer.appendChild(productcard);
}
