
let body = document.querySelector("tbody")

let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}


let users = getitems("Users")
console.log(users);

if (users != null) {
    users.forEach((ele, index, Array) => {
      let  tr = document.createElement("tr")

        let sno = index + 1
        tr.innerHTML = `
                <td>${sno}</td>
                <td> ${ele.username} </td>
                <td>${ele.email}</td>

`
        body.appendChild(tr)
    })
}


else {
    let  tr = document.createElement("tr")
    tr.innerHTML = `
                <td></td>
                <td>Users not Found!</td>
                <td></td>

`
    body.appendChild(tr)
}



