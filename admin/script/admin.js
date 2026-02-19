
let username = document.querySelector("#admin_name")
let password = document.querySelector("#password")
let form = document.querySelector("form")
let error = document.querySelectorAll(".error")
const closeeye = document.querySelector("#closeeye")
const openeye = document.querySelector("#openeye")





closeeye.addEventListener('click', () => {

    openeye.style.display = "block"
    closeeye.style.display = "none"
    let attribute = password.getAttribute('type')
    console.log(attribute);
    password.setAttribute("type", 'password')



})
openeye.addEventListener('click', () => {
    openeye.style.display = "none"
    closeeye.style.display = "block"
    let attribute = password.getAttribute('type')
    console.log(attribute);
    password.setAttribute("type", 'text')


})





form.addEventListener('submit', (e) => {
    e.preventDefault();

    let response1 = false
    let response2 = false
    debugger
    if (username.value != "") {

        if ((username.value) == "admin") {
            response1 = true
            username.style.border = "";
            error[0].innerText = ""
        } else {
            response1 = false
            username.style.border = "2px solid red";
            error[0].innerText = "User name wrong"
        }





    } else {
        response1 = false
        username.style.border = "2px solid red";
        error[0].innerText = "Please enter your name"
    }



    if (password.value != "") {
        debugger
        if (password.value == "admin@1234") {

            response2 = true
            password.style.border = "";
            error[1].innerText = ""

        } else {
            response2 = false
            password.style.border = "2px solid red";
            error[1].innerText = "wrong password"
        }



    } else {
        response2 = false
        password.style.border = "2px solid red";
        error[1].innerText = "Please enter Your password"
    }



    if (response1 && response2) {

        window.location.href="./dashboard.html"
        
    } else {

    }



})