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
document.getElementById("myBtn").addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
let bigcontainer = document.getElementsByClassName("bigcontainer");
let buttons = document.getElementsByClassName("button");
let button1 = document.getElementById("search_button");
let search = document.getElementById("search");
let login_btn = document.getElementById("login_btn");
let add = document.getElementById("add");
let nav_item = document.getElementsByClassName("nav-item");
let username = JSON.parse(localStorage.getItem("users")).username;
let userID = JSON.parse(localStorage.getItem("users")).userID;
let cartsite = document.getElementById("cartsite");
// logic button
if (username == null) {
  for (let i = 0; i + 1 < nav_item.length; i++) {
    nav_item[i].addEventListener("click", () => {
      alert("login/signin first!");
    });
    login_btn.innerText = "sign in / log in";
  }
} else {
  login_btn.innerText = username;
  cartsite.addEventListener("click", () => {
    if (username == "admin@gmail.com") {
      alert("you are not the customer");
    } else {
      window.location.href = "cart.html";
    }
  });
  add.addEventListener("click", () => {
    if (username == "admin@gmail.com") {
      window.location.href = "Home.html";
    } else {
      alert("you're not the admin");
    }
  });
}

onValue(ref(database, "AllProduct"), (snap) => {
  let data = snap.val();
  renderProduct(data);
});
onValue(ref(database, "users"), (snap) => {
  let listuser = snap.val();
  let usernow = listuser[userID];
  localStorage.setItem("currentUser", JSON.stringify(usernow));
});
//search
button1.addEventListener("click", function () {
  onValue(ref(database, "AllProduct"), (snap) => {
    let data = snap.val();
    renderProduct(data, "", search.value);
    search.value = "";
  });
});
//filter
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    onValue(ref(database, "AllProduct"), (snap) => {
      let data = snap.val();
      renderProduct(data, buttons[i].innerText, "");
    });
  });
}
//render product
function renderPro(data) {
  let product = document.createElement("div");
  product.className = "product_card";
  product.innerHTML = `
      <div class="add_to_wishlist">
            <i class="far fa-heart"></i>
          </div>
          <div class="image">
            <img
              src="${data.image}"
              alt=""
            />
          </div>
          <div class="product_info">
            <h2 class="product_name">${data.product}</h2>
            <p class="product_description">
              ${data.description}
            </p>
            <p class="ingredient">${data.ingredient}</p>
            <p class="type">Type: ${data.select}</p>
  
            <div class="bottom">
              <div class="price">
                <span class="_price">$${data.price}</span>
              </div>
              <div class="buttons">
                <button class="add_to_cart">
                  Add to Cart
                  <i class="fas fa-arrow-right"></i>
                </button>
                <button class="edit_product" data-id="${data.id}">
                  Edit
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </div>
          </div>`;
  return product;
}
//renderbutton
function renderEditbutton(data) {
  let button2 = document.querySelectorAll(".edit_product");
  if (username == "admin@gmail.com") {
    for (let i = 0; i < button2.length; i++) {
      button2[i].addEventListener("click", function () {
        localStorage.setItem("data", JSON.stringify(data[i]));
        window.location.href = "edit.html";
      });
    }
  } else {
    for (let i = 0; i < button2.length; i++) {
      button2[i].addEventListener("click", () => {
        alert("You're not the admin");
      });
    }
  }
}

//renderaddtocart
function renderaddtocart(data) {
  let button3 = document.querySelectorAll(".add_to_cart");
  if (username != "admin@gmail.com" && username != null) {
    for (let i = 0; i < button3.length; i++) {
      button3[i].addEventListener("click", () => {
        let listcartID = data[i].productID;

        let currentuser = JSON.parse(localStorage.getItem("currentUser"));

        let productInCart = {
          productID: listcartID,
          quantity: 1,
        };
        if (currentuser.cart == "") {
          currentuser.cart.push(productInCart);

          localStorage.setItem("currentUser", JSON.stringify(currentuser));
        } else {
          let condition = false;
          let index = 0;
          for (let i = 1; i < currentuser.cart.length; i++) {
            if (listcartID != currentuser.cart[i].productID) {
              condition = false;
            } else {
              condition = true;
              index = `${i}`;

              break;
            }
          }

          if (condition == false) {
            currentuser.cart.push(productInCart);

            localStorage.setItem("currentUser", JSON.stringify(currentuser));
          } else if (condition == true) {
            currentuser.cart[Number(index)].quantity += 1;
            localStorage.setItem("currentUser", JSON.stringify(currentuser));
          }
        }

        console.log(currentuser.cart);
        let newCart = currentuser.cart;
        update(ref(database, "users/" + userID), {
          cart: newCart,
        });
      });
    }
  } else if (username == null) {
    for (let i = 0; i < button3.length; i++) {
      button3[i].addEventListener("click", () => {
        alert("Sign in/log in first!");
      });
    }
  } else if (username == "admin@gmail.com") {
    for (let i = 0; i < button3.length; i++) {
      button3[i].addEventListener("click", () => {
        alert("you are not the customer");
      });
    }
  }
}

//logic
function renderProduct(data, type, search) {
  bigcontainer[0].innerHTML = `<div class="bigcontainer"></div>`;
  data = Object.values(data);
  if (type == null || type == "all") {
    for (let i = 0; i < data.length; i++) {
      bigcontainer[0].appendChild(renderPro(data[i]));
    }
    renderEditbutton(data);
    renderaddtocart(data);
  } else if (search != null) {
    for (let i = 0; i < data.length; i++) {
      if (search.toLowerCase() == data[i].product.toLowerCase()) {
        bigcontainer[0].appendChild(renderPro(data[i]));
      }
    }
    renderEditbutton(data);
    renderaddtocart(data);
    for (let i = 0; i < data.length; i++) {
      if (type == data[i].select) {
        bigcontainer[0].appendChild(renderPro(data[i]));
      }
    }
    renderEditbutton(data);
    renderaddtocart(data);
  }
}
