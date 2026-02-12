

const menu = document.querySelector('.fa-list')

const aside = document.querySelector('aside');
const crossmark = document.querySelector('.fa-xmark');
const search = document.querySelector('.fa-magnifying-glass');
const profile = document.querySelector('.profile');
const input = document.querySelector('.hide');



menu.addEventListener('click',()=>{
   aside.classList.add('aside1');
})
crossmark.addEventListener('click',()=>{
   aside.classList.remove('aside1');
})

search.addEventListener('click',()=>{
   input.classList.toggle('se-m1');
  
  
})