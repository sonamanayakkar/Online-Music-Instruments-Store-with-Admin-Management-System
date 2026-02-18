

let email = document.querySelector("#email")
let password = document.querySelector("#password")
let error = document.querySelectorAll(".error")
let reglocation = document.querySelector(".reglocation")


let form = document.querySelector("form")


function getitems(params) {
    let getter = localStorage.getItem(params)
    let conversion = JSON.parse(getter);
    return conversion;
}

let usersfromdb = getitems("Users")
console.log(usersfromdb);


form.addEventListener('submit', (e) => {
    // debugger
    e.preventDefault();


    let response1 = false
    let response2 = false

    if (email.value != "") {

        response1 = true
        email.style.border = "";
        error[0].innerText = ""



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

    if (usersfromdb != null) {


        for (let ele of usersfromdb) {
            console.log(ele.email);
            console.log(ele.password);

            if (((ele.email) == (email.value)) && ((ele.password) == (password.value))) {
                debugger
                alert("Verification Successfull!")

                email.value = ""
                password.value = ""

                window.location.href = "website/home.html";

            }

            else {
                alert("invalid access!")
            }

        }


    }

    else{
        
        reglocation.classList.add("gloweffect")
        
        alert("Username not found so please registration first")
        window.location.href="website/registration.html"
    }

}


