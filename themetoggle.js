const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

sun.classList.add("hidden");

document.getElementById("theme-toggler").addEventListener("click", themeToggle);



function themeToggle() {
    const element = document.body;
    element.classList.toggle("dark-mode");

    // Switch to Dark Theme
    if (moon.classList.contains("hidden")) {
        sun.classList.add("hidden");
        moon.classList.remove("hidden");
    } else {
    // Switch to Light Theme
    moon.classList.add("hidden");
   sun.classList.remove("hidden");
}
}