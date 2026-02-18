



let url = document.querySelector("#url")
let productname = document.querySelector("#pname")
let orinalprz = document.querySelector("#orinalprz")
let discountprz = document.querySelector("#discountprz")
let offer = document.querySelector("#offer")
let submit = document.querySelector("#submit")
let resetbtn = document.querySelector("#resetbtn")

let error = document.querySelectorAll(".error")


let form = document.querySelector("#form")


let filled1 = false;
let filled2 = false;
let filled3 = false;
let filled4 = false;
let filled5 = false;

let nodata_found = () => {
    let row = ""
    let tbody = document.querySelector("tbody");

    row = `
                        <tr>
                            
                            <td colspan="7" align="center" style="height:10vh">Empty List <i class="fa-solid fa-file-circle-xmark" style="color:red"></i></td>

                         </tr>
        
        `

    tbody.innerHTML = row
}


let productlist = new Array();

let iseditclicked = false;

if (productlist.length < 1) {
    nodata_found()
}

let setitems = (settingarray) => {
    let obj = JSON.stringify(settingarray)
    localStorage.setItem("products", obj)
}

let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}




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

    if ((productname.value) != "" && (productname.value).length>3) {
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

        debugger


        if (iseditclicked) {

            setitems(uploadeditcode())

            console.log(uploadeditcode());
            clearall()

            upload()

            let localstoragevalues = getitems("products")

            productlist = [];

            localstoragevalues.forEach(element => {
                productlist.push(element)
            });

            // console.log(productlist);

            iseditclicked = false
            submit.innerText = "Submit"
        }



        else {

            let details = {
                id: Date.now(),
                url: url.value,
                pname: productname.value,
                originalprice: one,
                discountprice: two,
                offerpercentage: three
            }
            clearall()
            productlist.push(details)
            setitems(productlist)
            upload()
        }

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


let upload = () => {

    let tbody = document.querySelector("tbody");
    let row = "";
    let count = 0;
    // debugger
    for (let ele of getitems("products")) {
        // console.log(ele.pname);
        count++
        row += `

                        <tr>
                            <td>${count}</td>
                            <td>
                                <div class="img">
                                    <img src="${ele.url}" alt="" loading="lazy">
                                </div>
                            </td>
                            <td> ${ele.pname}</td>
                            <td>₹ ${ele.originalprice}</td>
                            <td>₹ ${ele.discountprice}</td>
                            <td>${ele.offerpercentage} %</td>
                            <td>
                                <div class="actions">
                                    <i class="fa-regular fa-pen-to-square" onclick="edit(${ele.id})"></i>
                                    <i class="fa-solid fa-trash" onclick="remove(${ele.id})"></i>
                                </div>

                            </td>

                         </tr>
    
    `;
    }
    // console.log(row);
    tbody.innerHTML = row
}


function remove(selectedtrash) {

    debugger
    let conformation = confirm("Do you want to delete selected product ?")
    let deletelists = getitems("products");

    console.log(deletelists);

    let elementruturn = deletelists.filter((ele) => {

        // this condition returns not matching id objects
        if (ele.id != selectedtrash) {
            return ele
        }
    })

    if (conformation) {
        setitems(elementruturn)

        getitems("products")

        if ((getitems("products")).length < 1) {
            setitems()
            productlist = [];
            nodata_found()
        }
        else {
            upload()
            let localstoragevalues = getitems("products")

            productlist = [];

            localstoragevalues.forEach(element => {
                productlist.push(element)
            });
        }

        console.log(productlist);

    }



}

function edit(selecteditId) {
    debugger
    iseditclicked = true;
    console.log("hi");

    let submitbtn = document.querySelector("#submit")

    let idbox = document.querySelector(".idbox")

    let url = document.querySelector("#url")
    let productname = document.querySelector("#pname")
    let orinalprz = document.querySelector("#orinalprz")
    let discountprz = document.querySelector("#discountprz")
    let offer = document.querySelector("#offer")
    let product_id = document.querySelector("#ID")

    idbox.style.display = "flex"
    submitbtn.innerText = "edit"

    let getfromdbs = getitems("products")

    //here clicked edit row filtered and it return one object
    let matchingid = getfromdbs.filter((ele) => {
        if (selecteditId == ele.id) {
            return ele
        }

    })

    //then matchedid comes as ayyar format like [{}] so i need to unpack that
    // console.log(matchingid);

    // unpacked array
    let [selected] = matchingid;

    console.log(selected.id);

    //matching filtered object value to inputs

    product_id.value = selected.id
    url.value = selected.url
    productname.value = selected.pname
    orinalprz.value = selected.originalprice
    discountprz.value = selected.discountprice
    offer.value = selected.offerpercentage




}


function uploadeditcode() {
    debugger
    let submit = document.querySelector("#submit")
    let idbox = document.querySelector(".idbox")
    let url = document.querySelector("#url")
    let productname = document.querySelector("#pname")
    let orinalprz = document.querySelector("#orinalprz")
    let discountprz = document.querySelector("#discountprz")
    let offer = document.querySelector("#offer")
    let product_id = document.querySelector("#ID")
    debugger

    idbox.style.display = "none"
    // submit.innerText = "EDIT"


    let details = {
        id: Number(product_id.value),
        url: url.value,
        pname: productname.value,
        originalprice: Number(orinalprz.value),
        discountprice: Number(discountprz.value),
        offerpercentage: Number(offer.value)
    }

    let getfromdbs = getitems("products")
    // console.log(getfromdbs);


    let mapingid = getfromdbs.map((arr) => {

        // console.log(arr);

        if (arr.id == details.id) {
            return details
        }
        else {
            return arr
        }

    })

    // debugger

    // console.log(mapingid); // [{},{}]

    return mapingid




}

function clearall() {
    url.value = ""
    productname.value = ""
    orinalprz.value = ""
    discountprz.value = ""
    offer.value = ""
}




document.addEventListener('DOMContentLoaded', (e) => {
    upload()
    // console.log(productlist);

    let datafromlocalstorage = getitems("products")
    // console.log(datafromlocalstorage);

    datafromlocalstorage.forEach(element => {
        productlist.push(element)
    });
    console.log("this is default array");

    console.log(productlist);
})










