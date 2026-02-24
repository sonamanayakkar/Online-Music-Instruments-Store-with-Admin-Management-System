let year = document.querySelector("#live_year");

let date = new Date()

year.innerText = date.getFullYear()



let logoutbutton = document.querySelector("#exist")

logoutbutton.addEventListener('click', () => {



    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout"
    }).then((result) => {
        if (result.isConfirmed) {
            let timerInterval;
            Swal.fire({
                title: "Logging out...",
                html: "Please wait",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.href = "../index.html"
                }
            });


        }
    });


})



document.addEventListener('DOMContentLoaded', (e) => {
    // upload()


    let plus = document.querySelectorAll(".plus")
    let minus = document.querySelectorAll(".minus")
    // let price = document.querySelectorAll(".price")
    console.log(plus);

    // total()

    // buyingprocess()

    cartcount()


})
let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}

let setitems = (key, value) => {
    let conversion = JSON.stringify(value)
    localStorage.setItem(key, conversion)
}


let cartcount = () => {
    let totalcarts = document.getElementById("cartcount")

    let valuefromdb = getitems("cart_items")
    console.log("this is");

    // console.log(valuefromdb.length);

    totalcarts.innerText = (valuefromdb.length)

}





document.addEventListener('scroll', (e) => {
    let header = document.querySelector("header")


    let scroll = window.scrollY


    if (scroll > 250) {


        header.classList.add("top")
    }

    else {
        header.classList.remove("top")
    }

})




let form = document.querySelector(".form");
console.log(form);


let messages = new Array()

form.addEventListener('submit', (e) => {

    e.preventDefault()

    let username = document.querySelector(".username")
    let email = document.querySelector(".email")
    let phone_no = document.querySelector(".phone")
    let message = document.querySelector(".message")

    let error = document.querySelectorAll("#error")

    let conformation1 = false
    let conformation2 = false
    let conformation3 = false
    let conformation4 = false

    if (username.value != "") {
        if (username.value.length > 4) {
            conformation1 = true
            username.style.border = ""
            error[0].innerText = ""
        }

        else {
            conformation1 = false
            username.style.border = "2px solid red"
            error[0].innerText = "enter valid username"
        }
    }

    else {
        conformation1 = false
        username.style.border = "2px solid red"
        error[0].innerText = "please enter your name"
    }


    if (email.value != "") {

        let emailchecker = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        let verified = emailchecker.test(email.value)
        if (verified) {
            conformation2 = true
            email.style.border = ""
            error[2].innerText = ""
        }
        else {
            conformation2 = false
            email.style.border = "2px solid red"
            error[2].innerText = "please enter valid email"
        }
    }

    else {
        conformation2 = false
        email.style.border = "2px solid red"
        error[2].innerText = "please enter email"
    }


    if (phone_no.value != "") {

        let phcheck = /^[6-9]\d{9}$/
        let verifiedphno = phcheck.test(phone_no.value)
        if (verifiedphno) {
            conformation3 = true
            phone_no.style.border = ""
            error[1].innerText = ""
        }
        else {
            conformation3 = false
            phone_no.style.border = "2px solid red"
            error[1].innerText = "please enter valid phone number"
        }
    }

    else {
        conformation3 = false
        phone_no.style.border = "2px solid red"
        error[1].innerText = "please enter phone number"
    }


    if (message.value != "") {
        debugger
        message.addEventListener('keydown', (e) => {
            if (e.key == "Enter") {
                e.preventDefault()
            }
        })
        conformation4 = true
        message.style.border = ""
        error[3].innerText = ""

    }

    else {
        conformation4 = false
        message.style.border = "2px solid red"
        error[3].innerText = "please enter your Requirements"
    }




    if (conformation1 && conformation2 && conformation3 && conformation4) {

        let users = {
            username: username.value,
            email: email.value,
            message: message.value
        }

        messages.push(users)

        setitems("contact", messages)

        username.value = ""
        email.value = ""
        message.value = ""
        phone_no.value = ""


    }



})


document.addEventListener('DOMContentLoaded', (e) => {

    let detailsfromdb = getitems("contact")
    detailsfromdb.forEach(element => {
        messages.push(element)
    });

})







