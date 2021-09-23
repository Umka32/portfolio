//toggle menu

const toggle = document.querySelector(".main-nav__toggle");
const menu = document.querySelector(".page-header__nav");

toggle.addEventListener("click", function () {
  menu.classList.toggle("main-nav--closed");
  toggle.classList.toggle("main-nav__toogle--opened");
});


// Load More
const loadMore = document.querySelector(".button--works");

loadMore.addEventListener("click", function () {
  const works = document.querySelectorAll(".works__item--hidden");
  let i = 0;
  let a = works.length

  for (work of works) {
    if (i < 3) {
      work.classList.remove("works__item--hidden");
      if (a <= 3) {
        loadMore.classList.add("visually-hidden");
      }
    }
    i++;
  }
});
