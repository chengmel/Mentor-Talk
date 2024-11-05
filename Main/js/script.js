const notice = document.querySelector('.notice')
const active = document.querySelector('.active')
const ntext = document.querySelector('.notice-text')
const gatong = document.querySelector('.notice-text1')
const search = document.querySelector('.header-magnifier')
const dropdown = document.querySelector('.dropdown')
const hserach = document.querySelector(".header-X")
const input = document.querySelector(".input-box")


function classmove() {
    active.addEventListener('click', ()=>{
        gatong.style.display = 'block'
        ntext.style.display = 'none'
        active.style.color = '#487ff7'
        notice.style.color = 'black'
    })
    notice.addEventListener('click',()=>{
        ntext.style.display = 'block'
        gatong.style.display = 'none'
        notice.style.color = '#487ff7'
        active.style.color = 'black'
    })
}
classmove()

function call() {
    search.addEventListener('click', ()=>{
        hserach.style.display = 'block'
        search.style.display = 'none'
        dropdown.style.display = 'none'
        input.style.display = 'block'
    })
    hserach.addEventListener("click",()=>{
        input.style.display = 'none'
        dropdown.style.display = 'block'
        hserach.style.display = 'none'
        search.style.display = 'block'
    })    
}
call()