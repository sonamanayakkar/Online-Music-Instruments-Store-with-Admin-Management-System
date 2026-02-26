

const menu = document.querySelector('.fa-list')

const aside = document.querySelector('aside');
const crossmark = document.querySelector('.fa-xmark');
const search = document.querySelector('.fa-magnifying-glass');
const profile = document.querySelector('.profile');
const input = document.querySelector('.hide');
let logout = document.querySelector('#logout');




logout.addEventListener('click', (e) => {
   e.preventDefault()

   Swal.fire({
      title: "Are you sure?",
      text: "Dou want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
   }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
         });

         let timerInterval;
         Swal.fire({
            title: "Logging out...",
            html: "please wait",
            timer: 2000,
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


menu.addEventListener('click', () => {

   aside.classList.add('aside1');
})
crossmark.addEventListener('click', () => {
   aside.classList.remove('aside1');
})

search.addEventListener('click', () => {
   input.classList.toggle('se-m1');


})