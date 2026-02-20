

let email = document.querySelector("#email")
let password = document.querySelector("#password")
let error = document.querySelectorAll(".error")
let reglocation = document.querySelector(".reglocation")
const closeeye = document.querySelector("#closeeye")
const openeye = document.querySelector("#openeye")


let form = document.querySelector("form")



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





function getitems(params) {
    let getter = localStorage.getItem(params)
    let conversion = JSON.parse(getter);
    return conversion;
}

let usersfromdb = getitems("Users") || []
console.log(usersfromdb);


form.addEventListener('submit', (e) => {
    // debugger
    e.preventDefault();


    let response1 = false
    let response2 = false

    if (email.value != "") {
        debugger

        let mail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let conformation = mail.test(email.value)

        if (conformation) {
            response1 = true
            email.style.border = "";
            error[0].innerText = ""
        }
        else {
            response1 = false
            email.style.border = "2px solid red";
            error[0].innerText = "Please enter a valid email address!"
        }




    } else {
        response1 = false
        email.style.border = "2px solid red";
        error[0].innerText = "Please enter email Id"
    }



    if (password.value != "") {
        response2 = true
        password.style.border = "";
        error[1].innerText = ""


    } else {
        response2 = false
        password.style.border = "2px solid red";
        error[1].innerText = "Please enter Your password"
    }



    if (response1 && response2) {

        userdetailchecker()
    } else {

    }



})



function userdetailchecker() {


    console.log(usersfromdb);

    for (let element of usersfromdb) {
        console.log(element);

    }

    let user = usersfromdb.find(n => (n.email == email.value) && (n.password == password.value)
    )




    if (user) {
        alert("Login Successfull!")
        email.value = ""
        password.value = ""
        window.location.href = "website/home.html"
    }
    else {
        alert("User not found ")
        email.value = ""
        password.value = ""


    }





}


