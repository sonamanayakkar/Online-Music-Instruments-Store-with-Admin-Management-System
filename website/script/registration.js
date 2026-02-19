let fname = document.querySelector("#name");
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let confirmpassword = document.querySelector("#confirmpassword")


let form = document.querySelector("form")

let error = document.querySelectorAll(".error")
const closeeye1 = document.querySelector("#closeeye")
const openeye1 = document.querySelector("#openeye")
const closeeye2 = document.querySelector("#closeeye2")
const openeye2 = document.querySelector("#openeye2")

console.log(confirmpassword.value);
console.log(password.value);



closeeye.addEventListener('click', () => {

    openeye1.style.display = "block"
    closeeye1.style.display = "none"
    let attribute = password.getAttribute('type')
    console.log(attribute);
    password.setAttribute("type", 'password')



})
openeye.addEventListener('click', () => {

    openeye1.style.display = "none"
    closeeye1.style.display = "block"
    let attribute = password.getAttribute('type')
    console.log(attribute);
    password.setAttribute("type", 'text')


})
closeeye2.addEventListener('click', () => {

    openeye2.style.display = "block"
    closeeye2.style.display = "none"
    let attribute = confirmpassword.getAttribute('type')

    confirmpassword.setAttribute("type", 'password')



})
openeye2.addEventListener('click', () => {

    openeye2.style.display = "none"
    closeeye2.style.display = "block"
    let attribute = confirmpassword.getAttribute('type')

    confirmpassword.setAttribute("type", 'text')


})







let registrations = new Array()

let filled1 = false;
let filled2 = false;
let filled3 = false;



form.addEventListener('submit', (e) => {
    debugger
    e.preventDefault();

    // name verification

    if ((fname.value) != "") {


        if ((fname.value).length > 3) {
            filled1 = true
            fname.style.border = ""
            error[0].innerText = ""

        }
        else {
            filled1 = false
            fname.style.border = "2px red solid"
            error[0].innerText = "Please Enter valid Url"
            console.log("wrong Url");
        }

    }
    else {

        filled1 = false
        fname.style.border = "2px red solid"
        error[0].innerText = "Please Enter your name"
    }
    // email verification

    if ((email.value) != "") {

        let mailchecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (mailchecker.test(email.value)) {
            filled2 = true
            email.style.border = ""
            error[1].innerText = ""
        }
        else {
            filled2 = false
            console.log("hi");

            email.style.border = "2px red solid"
            error[1].innerText = "Invalid Email"
        }

    }

    else {
        filled2 = false
        console.log("hi");

        email.style.border = "2px red solid"
        error[1].innerText = "Please Enter Email"

    }

    //password verification

    if ((password.value) != "") {

        if ((password.value).length >= 8) {
            filled3 = true
            password.style.border = ""
            error[2].innerText = ""
        } else {
            filled3 = false
            console.log("hi");
            password.style.border = "2px red solid"
            error[2].innerText = "password must contain minimum 8 character"
        }

    }

    else {
        filled3 = false
        console.log("hi");

        password.style.border = "2px red solid"
        error[2].innerText = "Please Enter password"

    }


    //confirm password verification

    if ((confirmpassword.value) != "") {
        debugger
        if ((password.value) == (confirmpassword.value)) {
            filled3 = true
            confirmpassword.style.border = ""
            error[3].innerText = ""
        } else {

            if (password.value.length != 0) {
                filled3 = false
                console.log("hi");
                confirmpassword.style.border = "2px red solid"
                error[3].innerText = "password missmatched"
            }

        }
    } else {
        filled3 = false
        console.log("hi");

        confirmpassword.style.border = "2px red solid"
        error[3].innerText = ""
    }





    if (filled1 && filled2 && filled3) {


        //uppercasing

        let finalname = (fname.value).toUpperCase();



        let details = {
            id: Date.now(),
            username: finalname,
            email: email.value,
            password: password.value,

        }

        console.log(details);


        registrations.push(details)

        clearall()
        // console.log(productlist);


        let obj = JSON.stringify(registrations)
        localStorage.setItem("Users", obj)


        // console.log(getitems());
        alert("Registration Successfull!")

        window.location.href = "../index.html";


    }
    else {
        console.log("all are not filled");
    }


})



function clearall() {
    fname.value = ""
    email.value = ""
    password.value = ""
    confirmpassword.value = ""

}