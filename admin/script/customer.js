
let body = document.querySelector("tbody")

let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}

let users = getitems("Users")


users.forEach((ele, index, Array) => {
    let tr = document.createElement("tr")

    let sno=index+1
    tr.innerHTML = `
                <td>${sno}</td>
                <td> ${ele.username} </td>
                <td>${ele.email}</td>

`
    body.appendChild(tr)
})

