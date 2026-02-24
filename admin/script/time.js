





setInterval(() => {

    let hour = document.getElementById('hours')
    let minitus = document.getElementById('minitus')
    let seconds = document.getElementById('seconds')
    let am = document.getElementById('am')


    const date = new Date()

    hour.innerText = date.getHours()
    minitus.innerText = date.getMinutes()
    seconds.innerText = date.getSeconds()

    let zone = date.getHours() > 12 ? "PM" : "AM"

    am.innerText=zone



}, 1000);