

let customer = document.getElementById("customers")
let totalproduct = document.getElementById("totalproduct")
let Dashboard_product = document.getElementById("Dashboard_product")


document.addEventListener('DOMContentLoaded', () => {

    customer.innerText=getdata("Users").length
    Dashboard_product.innerText=getdata("products").length
   
   
})


function getdata(key) {
    let data = localStorage.getItem(key)
    return JSON.parse(data)
}


