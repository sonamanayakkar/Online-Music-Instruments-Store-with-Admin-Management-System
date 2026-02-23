let logoutbutton = document.querySelector("#exist")

logoutbutton.addEventListener('click', () => {

    const conformation = confirm("Do you want logout ?")

    if (conformation) {

        setTimeout(() => {
            window.location.href = "../index.html"
        }, 1000);

    }
})

let setitems = (settingarray, Keyname) => {
    let obj = JSON.stringify(settingarray)
    localStorage.setItem(Keyname, obj)
}

let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}

document.addEventListener('DOMContentLoaded', (e) => {
    upload()


    let plus = document.querySelectorAll(".plus")
    let minus = document.querySelectorAll(".minus")
    // let price = document.querySelectorAll(".price")


    total()

    buyingprocess()

    cartcount()


})


let increment = (plusbtn_value) => {
    let datafrom_db = getitems("cart_items");

    let qty = document.querySelectorAll(".qtyvalue")



    let filterdata = datafrom_db.filter((ele) => {


        if (ele.unique_id == plusbtn_value) {
            return ele

        }

    })



    let [unpack] = filterdata

    unpack.quantity++

    function eachproductprice(producgtlist) {
        const initialprice = Number(producgtlist.initial_price);  // 3500

        let increment_price = (producgtlist.quantity) * initialprice

        return increment_price;
    }
    console.log(eachproductprice(unpack));

    unpack.price = eachproductprice(unpack)





    let product = {
        id: unpack.id,
        image: unpack.image,
        initial_price: unpack.initial_price,
        price: unpack.price,
        productname: unpack.productname,
        quantity: unpack.quantity,
        unique_id: unpack.unique_id
    }



    let remainders = datafrom_db.map((ele) => {

        if (ele.unique_id == plusbtn_value) {
            return product

        }
        else {
            return ele
        }

    })




    setitems(remainders, "cart_items")
    upload()
    total()

}



let decreement = (plusbtn_value) => {
    let datafrom_db = getitems("cart_items");

    let qty = document.querySelectorAll(".qtyvalue")

    qty.forEach(element => {


    });


    let filterdata = datafrom_db.filter((ele) => {


        if (ele.unique_id == plusbtn_value) {
            return ele

        }

    })



    let [unpack] = filterdata
    if (unpack.quantity > 1) {

        unpack.quantity--
        function eachproductprice(producgtlist) {
            const initialprice = Number(producgtlist.initial_price);  // 3500

            let increment_price = (producgtlist.quantity) * initialprice

            return increment_price;
        }
        console.log(eachproductprice(unpack));

        unpack.price = eachproductprice(unpack)
        let product = {
            id: unpack.id,
            image: unpack.image,
            initial_price: unpack.initial_price,
            price: unpack.price,
            productname: unpack.productname,
            quantity: unpack.quantity,
            unique_id: unpack.unique_id
        }



        let remainders = datafrom_db.map((ele) => {

            if (ele.unique_id == plusbtn_value) {
                return product

            }
            else {
                return ele
            }

        })

        setitems(remainders, "cart_items")
        upload()
        total()

    }
}


let total = () => {
    let totalamount = document.getElementById("total_amount")
    let getdatafrom_db = getitems("cart_items") || []

    let sum = 0;
    getdatafrom_db.forEach(element => {
        sum += Number(element.price);

    });

    totalamount.innerText = sum
    //   console.log(sum);

}



let buyingprocess = () => {

    let buy_button = document.getElementById("buy_now")
    let totalamount = document.getElementById("total_amount")

    let datafrom_db = getitems("cart_items") ||[];

    datafrom_db.forEach(element => {
        element.price
    });

    buy_button.addEventListener('click', (e) => {

        // let orderconformation = confirm(`let confirm your order\n total price:${totalamount.innerText}`)

        Swal.fire({
            title: "Confirm Your Order?",
            text: `Total price ₹ ${totalamount.innerText}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00cb11",
            cancelButtonColor: "#d33",
            confirmButtonText: "Order"
        }).then((result) => {
            if (result.isConfirmed) {

                console.log(datafrom_db);



                Swal.fire({
                    title: "Thank You for Your Purchase!",
                    text: "Your order is on its way.",
                    icon: "success"
                });



                sendmail()
                setitems([], "cart_items")
                upload()
                total()

                cartcount()

            }
        });






        // if (orderconformation) {
        //     console.log(datafrom_db);
        //     setitems([], "cart_items")
        //     upload()
        //     total()

        //     cartcount()

        //     setTimeout(() => {
        //         Swal.fire({
        //             title: "Thank You for Your Purchase!",
        //             icon: "success",
        //             draggable: true
        //         });
        //     }, 500);



        // }



    })


}


function sendmail() {

    let totalprice = 0;
   
    let datafrom_db = getitems("cart_items") ||[];

    let productsarray = new Array()

    datafrom_db.forEach(element => {
        let products = {
            image: element.image,
            name: element.productname,
            units: element.quantity,
            price: element.price
        }
        totalprice += Number(element.price);
        productsarray.push(products);
    });

    let datafromsession = sessionStorage.getItem("currentuser")

    let user = JSON.parse(datafromsession)


    const templateparameters = {
        email: user.email,
        ordorder_id: Date.now(),

        orders: productsarray,

        cost: {

            total: totalprice

        }
    }

    emailjs.send("service_ecqfehk", "template_9m06uaw", templateparameters)
        .then(() => console.log("successfully"), setitems([], "cart_items"))
        .catch(err => alert("Failed"));
}





let upload = () => {
    let getdatafrom_db = getitems("cart_items") || []

    let container = document.querySelector("#cartcontainer")
    let buybutton = document.querySelector(".buycontainer")
    let row = "";


    getdatafrom_db.forEach(element => {

        row += `
                    <div class="col  d-flex  align-items-center py-3 parent">
                        <div class="details d-flex align-items-center gap-5">
                            <div class="img">
                                <img src="${element.image}" alt="">
                            </div>
                            <div class="details">
                                <h2 class="text-white fs-6 fs-md-1">${element.productname}</h2>
                                <h3 class="orange fs-6 fs-md-2">$<span class="price" data-baseprice=${element.price}>${element.price}</span></h3>
                            </div>
                        </div>
                        <div class="qty">
                            <div class="two d-flex align-items-center gap-md-4 gap-2 ">
                                <div class="three text-white minus" onclick="decreement(${element.unique_id})">-</div>
                                <div class="three1 fs-1 orange qtyvalue">${element.quantity}</div>
                                <div class="three text-white plus" onclick="increment(${element.unique_id})">+</div>
                            </div>

                        </div>

                        <div class="delete">
                            <i class="fa-regular fa-trash-can fs-lg-2 fs-5  text-danger" onclick="deleteitem(${element.id})"></i>
                        </div>

                    </div>
    `

    });

    if ((getdatafrom_db).length < 1) {
        container.innerHTML = nodatafound();
        buybutton.style.display = "none"
    } else {
        container.innerHTML = row;
        buybutton.style.display = "flex"
    }



}

let nodatafound = () => {

    let empty = `

    
                    <div class="col  d-flex  align-items-center py-5">
                       
                        <h3 class="text-white">Your Cart is empty !<i class="fa-solid fa-file-excel orange"></i></h3>
                    </div>
    
    `
    return empty
}


let deleteitem = (productid) => {

    let conformation = confirm("Do you want to remove this item from cart?")

    let valuefromdb = getitems("cart_items");

    let filteredarray = valuefromdb.filter((element) => {
        if (productid != element.id) {

            return element
        }
    })





    if (conformation) {

        setitems(filteredarray, "cart_items")

        upload()


    }
    total()
    cartcount()

}






let calculations = () => {
    let plus = document.querySelectorAll(".plus")
    let minus = document.querySelectorAll(".minus")
    let qtyvalue = document.querySelectorAll(".qtyvalue")

    console.log(qtyvalue);

    plus.forEach(element => {
        element.addEventListener('click', (e) => {

            console.log(element);

            let btn = e.target.closest(element);
            console.log(btn);


        })
    });


}


let cartcount = () => {
    let totalcarts = document.getElementById("cartcount")

    let valuefromdb = getitems("cart_items") ||[]


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










