
let category = document.querySelector("#category")
let form = document.querySelector("form")
let error = document.querySelector(".error")

let categories = new Array()

let iseditclicked = false

document.addEventListener('DOMContentLoaded', (e) => {
    upload()

    let datafromdb = getitems("category")

    datafromdb.forEach(element => {
        categories.push(element)
    });
})


form.addEventListener('submit', (e) => {
    e.preventDefault()


    let conformation1 = false
    if (category.value != "") {
        if ((category.value).length > 3) {
            conformation1 = true
            category.style.border = ""
            error.innerText = ""
        } else {
            conformation1 = false
            category.style.border = "2px solid red"
            error.innerText = "category name must contain above 3 charecters"
        }
    } else {
        conformation1 = false
        category.style.border = "2px solid red"
        error.innerText = "please enter category"
    }


    if (conformation1) {



        if (iseditclicked) {

            iseditclicked = false
            setitems("category", setediteditem())
            upload()

            let submit = document.querySelector("#submit")
            let category = document.querySelector("#category")

            submit.innerText = "submit"

            category.value = ""

            console.log(categories);

            let datafromdb = getitems("category")
            categories = []
            datafromdb.forEach(element => {
                categories.push(element)
            });

            console.log(categories);




        }

        else {
            let obj = {
                id: Date.now(),
                categoryname: category.value
            }

            categories.push(obj)

            category.value = ""

            setitems("category", categories)


            upload()
        }



    }



})


let upload = () => {

    let datafromdb = getitems("category")

    let tbody = document.querySelector("tbody")

    let count = 1
    let row = ""

    if (datafromdb.length > 0) {
        datafromdb.forEach(ele => {

            row += `
                  <tr>
                            <td>${count}</td>
                            <td>${ele.categoryname}</td>
                            <td>
                                <div class="actions">
                                    <i class="fa-regular fa-pen-to-square" onclick="edit(${ele.id})"></i>
                                    <i class="fa-solid fa-trash "  onclick="remove(${ele.id})"></i>
                                </div>

                            </td>
                        </tr>
                        <tr>

        `
            count++
            tbody.innerHTML = row
        });
    }

    else {

        row += `
                        <tr>
                            <td colspan=3>no data found</td> 
                        </tr>
                        <tr>

        `
        count++
        tbody.innerHTML = row
    }


}


let remove = (defaultid) => {


    Swal.fire({
        title: "Are you sure?",
        text: "do you want to delete this?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your category has been deleted.",
                icon: "success"
            });


            let datafromdb = getitems("category")




            let filtered = datafromdb.filter(ele => {

                if (ele.id != defaultid) {
                    return ele

                }
            })


            setitems("category", filtered)

            upload()
        }
    });





}


let edit = (editid) => {

    iseditclicked = true
    let submit = document.querySelector("#submit")
    let productid = document.querySelector("#ID")
    let datafromdb = getitems("category")

    let filtered = datafromdb.filter(ele => {
        if (editid == ele.id) {
            return ele
        }
    })

    let [unpack] = filtered;

    category.value = unpack.categoryname
    productid.value = unpack.id
    submit.innerText = "edit"
}


let setediteditem = () => {
    debugger
    let categoryofedited = document.querySelector("#category");
    let productidofedited = document.querySelector("#ID")

    console.log(categoryofedited.value);
    console.log(productidofedited.value);


    let datafromdb = getitems("category")


    let editabledata = {
        id: Number(productidofedited.value),
        categoryname: categoryofedited.value
    }

    let map = datafromdb.map(ele => {
        debugger
        if (ele.id == productidofedited.value) {
            return editabledata
        }

        else {
            return ele
        }
    })

    console.log(map);


    return map

}






function setitems(key, value) {

    let a = JSON.stringify(value)
    localStorage.setItem(key, a)


}

function getitems(key) {
    let a = localStorage.getItem(key)
    return JSON.parse(a)
}