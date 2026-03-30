let account = document.getElementById("account")

if (localStorage.getItem("currentUser")) {
    account.innerHTML = '<a href="../html/index.html"id="logout-btn"><i class="fa-solid fa-arrow-right-from-bracket" style="font-size: 30px;"></i></a>'
     document.getElementById("logout-btn").onclick = function() {
        localStorage.removeItem("currentUser")
}
}
else {
    account.innerHTML = '<a href="../html/login.html"><i class="fa-solid fa-circle-user" style="font-size: 30px;"></i></a>'
}

