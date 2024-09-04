//////////////////////////////////////////////////////////////////////////// Import CHUNG

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

import {
  get,
  getDatabase,
  set,
  ref,
  onValue,
  update,
  remove,
  push,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7cBhgG19WmkiTHZWIzGouoPD66ssI0mE",
  authDomain: "product-80da8.firebaseapp.com",
  databaseURL: "https://product-80da8-default-rtdb.firebaseio.com",
  projectId: "product-80da8",
  storageBucket: "product-80da8.appspot.com",
  messagingSenderId: "485102845839",
  appId: "1:485102845839:web:90a44bcfd346f58d1395fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// Dùng DOM
let username_login = document.getElementById("username_input_login");
let password_login = document.getElementById("password_input_login");
let username_register = document.getElementById("username_input_register");
let password_register = document.getElementById("password_input_register");
let login_btn = document.getElementById("login_btn");
let register_btn = document.getElementById("register_btn");

///////////////////////////////////////////////////////////////////// Đăng ký 1 tài khoản
register_btn.addEventListener("click", function () {
  let username = username_register.value;
  let password = password_register.value;

  createUserWithEmailAndPassword(auth, username, password) // Check xem cái user này tồn tại chưa
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      set(ref(database, "users/" + user.uid), {
        username: username,
        password: password,
        cart: [""],
      });
    })
    .then(() => {
      alert("Tạo tài khoản thành công");
      username_register.value = "";
      password_register.value = "";
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMess = err.message;

      alert(errorMess);
    });
});

////////////////////////////////////////////////////////////////////// Đăng nhập 1 tải khoản có sẵn
login_btn.addEventListener("click", function () {
  let username = username_login.value;
  let password = password_login.value;
  var user;
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      user = userCredential.user;
      let date = new Date();
      update(ref(database, "users/" + user.uid), {
        lastLogin: date,
      });
    })
    .then(() => {
      let users = {
        userID: user.uid,
        username: username,
      };
      localStorage.setItem("users", JSON.stringify(users));
      if (username == "admin@gmail.com") {
        window.location.href = "Front.html";
      } else {
        alert("Đăng nhập thành công");
        window.location.href = "Front.html";
      }
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMess = err.message;

      alert(errorMess);
    });
});
