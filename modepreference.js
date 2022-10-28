const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

const mql = window.matchMedia("(prefers-color-scheme: dark");

mql.onchange = (e) => {
  styleBody(e.matches);
};

window.onload = function () {
  styleBody(mql.matches);
};

function styleBody(isDarkMode) {
  if (isDarkMode) {
    moon.classList.add("hidden");
    sun.classList.remove("hidden");
    document.body.classList.add("dark-mode");
  } else {
    sun.classList.add("hidden");
    moon.classList.remove("hidden");
    document.body.classList.remove("dark-mode");
  }
}
