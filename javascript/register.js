// if already logged in, redirect to home page
// if (localStorage.getItem("currentUser")) {
//   location.href = "./index.html";
// }

let form = document.querySelector("form")

form.addEventListener("submit",(e) =>
{
    e.preventDefault();

    let fullname = document.getElementById('fullname').value.trim()
    let email = document.getElementById('email').value.trim()
    let password = document.getElementById('password').value

    let lowerCaseletter = /[a-z]/g;
    let upperCaseletter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    if(fullname.length < 6)
        alert("Tên đăng nhập phải lớn hơn 6 Ký tự")
    else if(password.lenght< 8)
        alert("Mật khẩu phải nhiều hơn 8 ký tự")
    else if(!password.match(lowerCaseletter))
        alert("Mật khẩu phải chứa ký tự viết thường")
    else if(!password.match(upperCaseletter))
        alert("Mật khẩu phải chứa ký tự in hoa")
    else if(!password.match(numbers))
        alert("Mật khẩu phải chứa ký tự đặc biệt")
    else{
        if(localStorage.getItem("users"))
        {
            let users = JSON.parse(localStorage.getItem("users"))

            users.push(
                {
                    email,
                    password,
                    fullname
                }
            )

            localStorage.setItem("users", JSON.stringify(users));
        }else{
            localStorage.setItem(
                "users",
                JSON.stringify([
                    {
                        email,
                        password,
                        fullname,
                    }
                ])
            )
        }
        alert("Đăng ký thành công, vui lòng đăng nhập")
    }
})  