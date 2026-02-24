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








let getitems = (key) => {
    let item = localStorage.getItem(key)
    return JSON.parse(item);
}


document.addEventListener('DOMContentLoaded', (e) => {
    upload()
})



let upload = () => {
    let datafromdb = getitems("contact") || []
    let tbody = document.querySelector('tbody')
    let count = 1;
    let row = ""

    datafromdb.forEach(element => {

        row += `
                            <tr>
                                <td>${count}</td>
                                <td> ${element.username} </td>
                                <td>${element.email}</td>
                                <td id="message_box"><p>${element.message}</p></td>

                            </tr>
    `
        count++
    });


    if (datafromdb.length > 0) {
        tbody.innerHTML = row
    }

    else {
        tbody.innerHTML = `
                        <tr>
                                <td colspan="4">No message found</td>
                               
                        </tr>
         `
    }










}

