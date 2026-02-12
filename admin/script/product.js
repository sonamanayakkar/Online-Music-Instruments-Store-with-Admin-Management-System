// import { getitems } from "../../utility"

let url = document.querySelector("#url")
let productname = document.querySelector("#pname")
let orinalprz = document.querySelector("#orinalprz")
let discountprz = document.querySelector("#discountprz")
let offer = document.querySelector("#offer")
let submit = document.querySelector("#submit")

let error = document.querySelectorAll(".error")


let form = document.querySelector("#form")


let filled1 = false;
let filled2 = false;
let filled3 = false;
let filled4 = false;
let filled5 = false;

// console.log(typeof(orinalprz.value));


let productlist = new Array();



form.addEventListener('submit', (e) => {
    // debugger
    e.preventDefault()

    // url verification

    if (url.value != "") {
        const urlpattern = /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-\.\?\=\#]*)*\/?$/;

        if ((urlpattern.test(url.value))) {
            filled1 = true
            url.style.border = ""
            error[0].innerText = ""

        }
        else {
            filled1 = false
            url.style.border = "2px red solid"
            error[0].innerText = "Please Enter valid Url"
            console.log("wrong Url");
        }

    }
    else {

        filled1 = false
        url.style.border = "2px red solid"
        error[0].innerText = "Please Enter Url"
    }
    // product name verification

    if ((productname.value) != "") {
        filled2 = true
        productname.style.border = ""
        error[1].innerText = ""
    }

    else {
        filled2 = false
        console.log("hi");

        productname.style.border = "2px red solid"
        error[1].innerText = "Please Enter product name"

    }

    //original prize verification

    if ((orinalprz.value) != "") {
        filled3 = true

        let roundop = Math.trunc(orinalprz.value);

        orinalprz.style.border = ""
        error[2].innerText = ""
    }

    else {
        filled3 = false
        console.log("hi");

        orinalprz.style.border = "2px red solid"
        error[2].innerText = "Please Enter Price"

    }

    if ((discountprz.value) != "") {
        let roundop = Math.trunc(orinalprz.value);
        filled4 = true
        discountprz.style.border = ""
        error[3].innerText = ""
    }

    else {
        filled4 = false
        console.log("hi");

        discountprz.style.border = "2px red solid"
        error[3].innerText = "Please Enter discount"

    }

    if ((offer.value) != "") {
        filled5 = true
        offer.style.border = ""
        error[4].innerText = ""
    }

    else {
        filled5 = false
        console.log("hi");

        offer.style.border = "2px red solid"
        error[4].innerText = "Please Enter Offer"

    }

    if (filled1 && filled2 && filled3 && filled4 && filled5) {

        let [one, two, three] = roundingvalues(orinalprz, discountprz, offer)

        // console.log(one, two, three);

        let details = {
            id: Date.now(),
            url: url.value,
            pname: productname.value,
            originalprice: one,
            discountprice: two,
            offerpercentage: three
        }

        productlist.push(details)

        clearall()
        // console.log(productlist);


        let obj = JSON.stringify(productlist)
        localStorage.setItem("products", obj)


        // console.log(getitems());

        setitems(getitems)

       getitems("products")

    }
    else {
        console.log("all are not filled");
    }


})



function roundingvalues(op, ds, off) {

    let finalop = Math.trunc(Number(op.value))
    let finalds = Math.trunc(Number(ds.value))
    let finaloff = Math.trunc(Number(off.value))

    // console.log(finalop,finalds,finaloff);

    return [finalop, finalds, finaloff]


}


function clearall() {
    url.value = ""
    productname.value = ""
    orinalprz.value = ""
    discountprz.value = ""
    offer.value = ""
}

 let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}




let setitems = (callback) => {

    console.log(getitems());

    let tbody = document.querySelector("tbody");

    let tr = document.createElement("tr")


    for (let ele of callback("products")) {
        console.log(ele.pname);



        tr.innerHTML = `

                    
                            <td>1</td>
                            <td>
                                <div class="img">
                                    <img src="${ele.url}" alt="" loading="lazy">
                                </div>
                            </td>
                            <td>$ ${ele.pname}</td>
                            <td>$ ${ele.originalprice}</td>
                            <td>$ ${ele.discountprice}</td>
                            <td>54% ${ele.offerpercentage}</td>
                            <td>
                                <div class="actions">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                    <i class="fa-solid fa-trash "></i>
                                </div>

                            </td>

                        
    
    `;
        tbody.appendChild(tr);

    }








}













