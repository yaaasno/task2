let burger  = document.querySelectorAll('.js-burger');
let menu    = document.querySelector('.burger-panel');
let burgerButton  = document.querySelector('.burger');
let body  = document.querySelector('body');

let i;
for (i = 0; i < burger.length; i++) {
  burger[i].onclick = function() {
    menu.classList.toggle("active");
    burgerButton.classList.toggle("burger--open");
    body.classList.toggle("body-lock");
  }
};

window.onscroll = function() {myFunction()};
let headerGo = document.querySelector('.header');
let main = document.querySelector('main');
let sticky = headerGo.offsetTop;
function myFunction() {
  if (window.pageYOffset > sticky) {
    headerGo.classList.add("header--sticky");
    main.classList.add("main");
  } else {
    headerGo.classList.remove("header--sticky");
    main.classList.remove("main");
  }
}

let acc = document.getElementsByClassName("tab__button");
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("tab__button--open");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
