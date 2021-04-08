const menuBars = document.getElementById("menu-bars");
const navEl = document.getElementsByTagName("nav")[0];
const backDrop = document.querySelector(".back-drop");
const mainLogo = document.getElementById("main-logo");
const cvEl = document.querySelector(".cv");

const arrayCV = [
  "",
  " 111111Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, iste",
  " 222222minus eaque tempore magni soluta provident laborum debitis inventore",
  "33333 praesentium non ea, eos quae distinctio? Dolorem suscipit iusto",
  " 444444distinctio? Quis!",
];
const scrollableSections = [
  "header",
  "about",
  "vision",
  "board",
  "footer1",
  "brands",
  "services",
  "contact",
  "footer",
];
let currentView = 0;
let touchStart;
let chosen = "1";

const removeDotCircle = () => {
  const icon = document.getElementById(`icon-${currentView}`);
  icon.classList.remove("fa-dot-circle");
  icon.classList.add("fa-circle");
  icon.style.fontSize = "10px";
};
const addDotCircle = () => {
  const icon = document.getElementById(`icon-${currentView}`);
  icon.classList.remove("fa-circle");
  icon.classList.add("fa-dot-circle");
  icon.style.fontSize = "15px";
};
addDotCircle();

function toggleNav() {
  menuBars.classList.toggle("change");

  // navEl.style.visibility =
  //   navEl.style.visibility === "visible" ? "hidden" : "visible";
  backDrop.hidden = !backDrop.hidden;
  if (backDrop.hidden) {
    navEl.classList.remove("slide-left");
    navEl.classList.add("slide-right");
  } else {
    navEl.classList.remove("slide-right");
    navEl.classList.add("slide-left");
  }
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
    document.getElementById(scrollableSections[currentView]).style.opacity =
      "0";
    removeDotCircle();
    currentView = 0;
    addDotCircle();
    document.getElementById(scrollableSections[currentView]).style.opacity =
      "1";
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!backDrop.hidden) toggleNav();
    return;
  }
  const navItem = e.target.closest(".nav-item");

  if (navItem) {
    document
      .getElementById(navItem.dataset.scroll)
      .scrollIntoView({ behavior: "smooth" });
    toggleNav(navItem.dataset.scroll);
    removeDotCircle();
    document.getElementById(scrollableSections[currentView]).style.opacity =
      "0";
    currentView = scrollableSections.findIndex(
      section => section === navItem.dataset.scroll
    );
    document.getElementById(scrollableSections[currentView]).style.opacity =
      "1";
    addDotCircle();
    return;
  }

  const person = e.target.closest(".person");
  if (person) {
    document.getElementById(chosen).classList.remove("chosen");
    person.classList.add("chosen");
    chosen = person.id;
    cvEl.textContent = arrayCV[chosen];
  }
});

const scrollHandler = direction => {
  removeDotCircle();
  document.getElementById(scrollableSections[currentView]).style.opacity = "0";
  currentView += direction;
  if (currentView < 0) currentView = 0;
  if (currentView === scrollableSections.length)
    currentView = scrollableSections.length - 1;
  document.getElementById(scrollableSections[currentView]).style.opacity = "1";
  document.getElementById(scrollableSections[currentView]).scrollIntoView();
  addDotCircle();
};

document.addEventListener("keydown", e => {
  if (e.key === "PageDown" || e.key === "ArrowDown") scrollHandler(1);
  if (e.key === "PageUp" || e.key === "ArrowUp") scrollHandler(-1);
});

document.addEventListener("wheel", e => {
  if (e.deltaY > 0) scrollHandler(1);
  else scrollHandler(-1);
});
document.addEventListener("touchstart", e => {
  touchStart = e.changedTouches[0].clientY;
});

document.addEventListener("touchend", e => {
  if (e.changedTouches[0].clientY - touchStart > 5) scrollHandler(-1);
  if (e.changedTouches[0].clientY - touchStart < -5) scrollHandler(1);
});
