
let addcart_productlists = new Array();

document.addEventListener('DOMContentLoaded', () => {

    console.log(addcart_productlists);
    
    upload()
    

    debugger
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
        let count = 6;
        valuefromdb.forEach(element => {
            let our_products = document.querySelector("#ourproducts")
            let create = document.createElement("div")
            create.classList.add("col")



            let items = `
                        <div class="img position-relative">
                            <img src="${element.url}" alt="">
                            <div class="sales position-absolute top-0 end-0 mt-3 me-2">
                                <div class="one py-1 px-3 text-center text-white fw-bold">${element.offerpercentage}%</div>
                                <div class="bgorange py-1 px-3 mt-2 text-center text-dark fw-bold">Sale</div>
                            </div>
                        </div>
                        <div class="contents d-flex flex-column gap-4 align-items-center justify-content-center p-4">
                            <div class="box">
                                <h4 class="text-white text-center productname">${element.pname}</h4>
                                <h5>
                                    <del class="text-white-50 fs-6">$${element.originalprice}</del>
                                    <span class="orange fs-4 ">$<span class="finalprice">${element.discountprice}</span></span>
                                </h5>
                            </div>
                            <div class="box">
                                <button  type="submit" class="btn fw-bold bgorange  p-3 addtocart" data-id="${count}">
                                    <i class="fa-brands fa-opencart me-2" "></i>Add to cart</button>
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

    debugger;

    let btn = e.target.closest(".addtocart")

    const id = btn.dataset.id;

    console.log(id);



    if (btn) {
        let container = btn.closest(".col")

        let image = container.querySelector("img")
        let productname = container.querySelector(".productname")
        let finalprice = container.querySelector(".finalprice")

        console.log(finalprice.innerText);
        console.log(productname.innerText);

        debugger
        let collectionof_product = {
            
            id: Date.now(),
            unique_id: id,
            image: image.src,
            productname: productname.innerText,
            initial_price: finalprice.innerText,
            price: finalprice.innerText,
            quantity:1
        }

        let itemsfrom_db = getitems("cart_items") || []

        //checks selected id is already exist or not
        let checkalreadyexist = itemsfrom_db.some(items => items.unique_id === id
        )



        if (checkalreadyexist) {
            alert("This item is already in your cart.");
        }

        else {
            console.log(collectionof_product);

            addcart_productlists.push(collectionof_product);

            console.log(addcart_productlists);

            setitems(addcart_productlists, "cart_items");
            cartcount()
        }


        

    }
})



let cartcount=()=>{
    let totalcarts = document.getElementById("cartcount")

    let valuefromdb = getitems("cart_items")
    console.log("this is");
    
    // console.log(valuefromdb.length);

    totalcarts.innerText=(valuefromdb.length)
    
}

































