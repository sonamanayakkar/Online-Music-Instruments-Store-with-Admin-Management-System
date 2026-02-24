
const bar = document.querySelector(".minimize")
let menus = document.querySelectorAll(".locate")
let image = document.querySelector(".image")
let adminname = document.querySelector(".logo")
let section = document.querySelector("section")
let apps = document.querySelector(".apps")


bar.addEventListener('click', (e) => {
    section.classList.toggle("shrink")
    adminname.classList.toggle("invisible")
    apps.classList.toggle("verticle")

    menus.forEach(element => {
        element.classList.toggle("hide")
    });

})






let customer = document.getElementById("customers")
let totalproduct = document.getElementById("totalproduct")
let totalcetegory = document.getElementById("category")
let Dashboard_product = document.getElementById("Dashboard_product")


document.addEventListener('DOMContentLoaded', () => {
    // debugger
    let datafromdb = getdata("products") || []
    let Userdatafromdb = getdata("Users") || []
    let categorydatafromdb = getdata("category") || []
    console.log(categorydatafromdb.length);



    Dashboard_product.innerText = datafromdb.length
    customer.innerText = Userdatafromdb.length
    totalcetegory.innerText = categorydatafromdb.length





})


function getdata(key) {
    let data = localStorage.getItem(key)



    if (data == "undefined") {
        return []
    }
    else {
        return JSON.parse(data)
    }


}


