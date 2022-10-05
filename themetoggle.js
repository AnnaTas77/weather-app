const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

sun.classList.add("hidden");

document.getElementById("theme-toggler").addEventListener("click", themeToggle);

function themeToggle() {
    const element = document.body;
    element.classList.toggle("dark-mode");

    if (moon.classList.contains("hidden")) {
        moon.classList.remove("hidden");
        sun.classList.add("hidden");
    } else {
        sun.classList.remove("hidden");
        moon.classList.add("hidden");
    }
}