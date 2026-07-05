// Smooth Scroll Effect for Navigation Buttons
document.querySelectorAll(".nav button").forEach((button, index) => {
    button.addEventListener("click", () => {
        const sections = ["about", "skills", "projects", "contact"];
        document.getElementById(sections[index]).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Show alert when form is submitted
document.querySelector(".submit-btn").addEventListener("click", function () {
    alert("Your form has been submitted successfully!");
});

// Highlight the active navigation button while scrolling
window.addEventListener("scroll", () => {
    const sections = ["about", "skills", "projects", "contact"];
    let current = "";

    sections.forEach(id => {
        let sectionTop = document.getElementById(id).offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = id;
        }
    });

    document.querySelectorAll(".nav button").forEach((btn, index) => {
        btn.classList.remove("active-btn");

        if (sections[index] === current) {
            btn.classList.add("active-btn");
        }
    });
});
const fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
    fadeElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
});

const topBtn = document.getElementById("topBtn");

// show button after scrolling 300px
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

// scroll to top when clicked
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

