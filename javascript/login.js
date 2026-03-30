// if already logged in, redirect to home page
// if (localStorage.getItem("currentUser")) {
//   location.href = "./html/index.html";
// }

let form = document.querySelector("form");


form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!localStorage.getItem("users")) {
    alert("No user found");
  } 
  else {
    let users = JSON.parse(localStorage.getItem("users"));

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let existingUser = users.find(
      (index) =>
        index.email === email.value.trim() &&
        index.password === password.value.trim()
    );
console.log(existingUser) //und...
    if (existingUser) {
      localStorage.setItem("currentUser", JSON.stringify(existingUser));

      location.href = "./html/index.html";
    } else {
      alert("Email hoặc mật khẩu không chính xác");
    }
  }
});

