

const menu = document.querySelector('.fa-list')

const aside = document.querySelector('aside');
const crossmark = document.querySelector('.fa-xmark');
const search = document.querySelector('.fa-magnifying-glass');
const profile = document.querySelector('.profile');
const input = document.querySelector('.hide');
let logout = document.querySelector('#logout');




logout.addEventListener('click',(e)=>{
      e.preventDefault()
      
      let conformation = confirm("Do you want to logout ?")

      if (conformation) {

         setTimeout(() => {
             window.location.href="../index.html"
         }, 1000);
        
      }


      
})


menu.addEventListener('click',()=>{
   
   aside.classList.add('aside1');
})
crossmark.addEventListener('click',()=>{
   aside.classList.remove('aside1');
})

search.addEventListener('click',()=>{
   input.classList.toggle('se-m1');
  
  
})