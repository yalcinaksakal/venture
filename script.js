const menuBars = document.getElementById("menu-bars");
const navEl = document.getElementsByTagName("nav")[0];
const backDrop = document.querySelector(".back-drop");
const mainLogo = document.getElementById("main-logo");

let numberofObservers = 0;

function toggleNav() {
  menuBars.classList.toggle("change");
  navEl.style.visibility =
    navEl.style.visibility === "visible" ? "hidden" : "visible";
  backDrop.hidden = !backDrop.hidden;
  mainLogo.setAttribute(
    "src",
    backDrop.hidden ? "./images/logo.png" : "./images/logo-black.png"
  );
}
//event listeners
document.addEventListener("click", e => {
  if (!e.target.closest(".companies")) e.preventDefault();
  const menuBarsClicked = e.target.closest(".menu-bars");
  if (menuBarsClicked) {
    toggleNav();
    return;
  } else if (!e.target.closest(".navigation") && !backDrop.hidden) toggleNav();

  if (e.target.closest(".logo")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!backDrop.hidden) toggleNav();
    return;
  }
  const navItem = e.target.closest(".nav-item");

  if (navItem) {
    document
      .getElementById(navItem.dataset.scroll)
      .scrollIntoView({ behavior: "smooth" });
    toggleNav();
    return;
  }
});

//intersection observers
const myObserver = new IntersectionObserver(elements => {
  if (elements[0].intersectionRatio !== 0) {
    //console.log(" The element is in view!");
    imgloader(elements[0].target, numberofObservers);
    myObserver.unobserve(observedEls[numberofObservers]);
    numberofObservers++;
    if (observedEls[numberofObservers])
      myObserver.observe(observedEls[numberofObservers]);
  } else {
    //console.log("The element is out of view");
  }
});
const observedEls = document.querySelectorAll(".observe");

// myObserver.observe(observedEls[0]);
