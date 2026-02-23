let logoutbutton = document.querySelector("#exist")

logoutbutton.addEventListener('click',()=>{

    const conformation = confirm("Do you want logout ?")

    if (conformation) {

        setTimeout(() => {
            window.location.href="../index.html"
        }, 1000);
        
    }
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
