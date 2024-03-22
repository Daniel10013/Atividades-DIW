let mobileButton = document.querySelector(".menu-icon");
let mobileNav = document.getElementById('mobile');
let clickedButton = false;

mobileButton.addEventListener('click', function(){
    if(clickedButton == false){
        mobileNav.style.animation = 'menuOpenAnimation 1s';
        mobileNav.classList.remove('menu-closed');
        mobileNav.classList.add('menu-open');
        clickedButton = true;
        resetStyle();
        return;
    }
    if(clickedButton == true){
        mobileNav.style.animation = 'menuCloseAnimation 1s';
        mobileNav.classList.remove('menu-open');
        mobileNav.classList.add('menu-closed');
        clickedButton = false;
        resetStyle();
        return;
    }
})

function resetStyle(){
    setTimeout(function(){
        mobileNav.style = "";
    }, 1100);
}