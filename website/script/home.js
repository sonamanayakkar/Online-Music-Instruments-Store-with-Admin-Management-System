

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


let addcart_productlists = new Array();

document.addEventListener('DOMContentLoaded', () => {

    console.log(addcart_productlists);

    upload()



    let valuefromdb = getitems("cart_items")

    if (valuefromdb) {
        valuefromdb.forEach(element => {
            addcart_productlists.push(element)
        });

    }

    cartcount()


})

let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}
let setitems = (settingarray, nameoflist) => {
    let obj = JSON.stringify(settingarray)
    localStorage.setItem(nameoflist, obj)
}


let valuefromdb = getitems("products")




let upload = () => {


    let valuefromdb = getitems("products")

    if (valuefromdb) {
        let count = 10;
        valuefromdb.forEach(element => {
            let our_products = document.querySelector("#ourproducts")
            let create = document.createElement("div")
            create.classList.add("col", "mt-4")

            let items = `
                         <div class="cart position-relative " style="width: 100%;">
                            <div class="img">
                                <img src="${element.url}"
                                    class="card-img-top" alt="...">
                            </div>

                            <div class="sales  mt-3 me-2">
                                <div class="one p-2 text-center fw-bold mb-2">${element.offerpercentage}%</div>
                                <div class="heart p-2 text-center  fw-bold mb-2"><i class="fa-regular fa-heart"></i>
                                </div>
                                <div class="three p-2 text-center  fw-bold"><i class="fa-solid fa-share-nodes"></i>
                                </div>

                            </div>
                            <div class="card-body bg-dark text-center">
                                <h5 class="card-title text-white productname">${element.pname}</h5>

                                <h6>
                                    <del class="text-white-50 ">₹${element.originalprice}</del>
                                    <span class="orange  ">₹ <span class="finalprice">${element.discountprice}</span></span>
                                </h6>
                                <button type="submit" class="btn fw-bold   p-2 addtocart" id="" data-id="${count}"><i
                                        class="fa-brands fa-opencart me-2"></i>Add to cart</button>
                            </div>

                        </div>
    
    `
            count++
            create.innerHTML = items
            our_products.appendChild(create)
        });
    }




}



document.addEventListener('click', (e) => {


    let btn = e.target.closest(".addtocart");
    if (!btn) return;
    const id = btn.dataset.id;



    if (btn) {
        let container = btn.closest(".col")

        let image = container.querySelector("img")
        let productname = container.querySelector(".productname")
        let finalprice = container.querySelector(".finalprice")

        debugger
        let collectionof_product = {

            id: Date.now(),
            unique_id: id,
            image: image.src,
            productname: productname.innerText,
            initial_price: finalprice.innerText,
            price: finalprice.innerText,
            quantity: 1
        }

        let itemsfrom_db = getitems("cart_items") || []

        //checks selected id is already exist or not
        let checkalreadyexist = itemsfrom_db.some(items => items.unique_id === id
        )



        if (checkalreadyexist) {
            const toast = Toastify({
                text: `
                <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                        <span>Product already added to cart!</span>
                       <i class="fa-solid fa-xmark" id="cancelBtn"></i>
             
                </div>
                    `,
                duration: 1500,
                gravity: "top",
                position: "right",
                escapeMarkup: false,
                style: {
                    background: "linear-gradient(to right, #ff0000, #ff5050, #ff0000)",
                    borderRadius: "10px",
                    padding: "30px"
                },
                onClick: function () {
                    toast.hideToast(); 
                }
            });

            toast.showToast();

        }

        else {
            console.log(collectionof_product);

            addcart_productlists.push(collectionof_product);

            console.log(addcart_productlists);

            setitems(addcart_productlists, "cart_items");
            cartcount()

            const toast = Toastify({
                text: `
                <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                        <span>Product added to cart</span>
                       <i class="fa-solid fa-xmark" id="cancelBtn"></i>
             
                </div>
                    `,
                duration: 1500,
                gravity: "top",
                position: "right",
                escapeMarkup: false,
                style: {
                    background: "linear-gradient(to right, #0caf01, #509c38, #0caf01)",
                    borderRadius: "10px",
                    padding: "30px"
                },
                onClick: function () {
                    toast.hideToast();  
                }
            });

            toast.showToast();


        }




    }
})








let cartcount = () => {
    let totalcarts = document.getElementById("cartcount")

    let valuefromdb = getitems("cart_items") || []
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

































