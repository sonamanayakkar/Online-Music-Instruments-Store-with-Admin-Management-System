

let customer = document.getElementById("customers")
let totalproduct = document.getElementById("totalproduct")
let Dashboard_product = document.getElementById("Dashboard_product")


document.addEventListener('DOMContentLoaded', () => {
    // debugger
    let datafromdb = getdata("products") || []
    let Userdatafromdb = getdata("Users") || []
    console.log(Userdatafromdb);



    Dashboard_product.innerText = datafromdb.length
    customer.innerText = Userdatafromdb.length





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


