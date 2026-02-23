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

    else{
          header.classList.remove("top")
    }

})
