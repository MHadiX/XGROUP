/* ==========================================
   XSec Solutions
   Coming Soon Landing Page
========================================== */

// ==========================================
// Launch Date
// ==========================================

const launchDate = new Date("July 10, 2026 00:00:00").getTime();

// ==========================================
// Countdown
// ==========================================

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

function updateCountdown() {

    const now = new Date().getTime();

    const distance = launchDate - now;

    if (distance <= 0) {

        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";

        return;

    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    days.innerHTML = String(d).padStart(2, "0");
    hours.innerHTML = String(h).padStart(2, "0");
    minutes.innerHTML = String(m).padStart(2, "0");
    seconds.innerHTML = String(s).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);

// ==========================================
// Mouse Glow
// ==========================================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// ==========================================
// Floating Particles
// ==========================================

const particles = document.getElementById("particles");

for (let i = 0; i < 40; i++) {

    const particle = document.createElement("span");

    const size = Math.random() * 4 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * 100 + "%";

    particle.style.animationDuration =
        8 + Math.random() * 12 + "s";

    particle.style.animationDelay =
        Math.random() * 5 + "s";

    particles.appendChild(particle);

}

// ==========================================
// Scroll Reveal
// ==========================================

const revealItems = document.querySelectorAll(
    ".hero-content,.card,.footer"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.15

    }

);

revealItems.forEach((item) => {

    item.classList.add("hidden");

    observer.observe(item);

});

// ==========================================
// Notify Form
// ==========================================

const form = document.querySelector(".notify-form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = this.querySelector("input").value;

    if (email === "") {

        alert("Please enter your email.");

        return;

    }

    alert(
        "Thank you! We'll notify you when XSec Solutions launches."
    );

    this.reset();

});

// ==========================================
// Navbar Blur
// ==========================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.background = "rgba(5,5,5,.80)";
        header.style.backdropFilter = "blur(25px)";

    } else {

        header.style.background = "rgba(5,5,5,.45)";
        header.style.backdropFilter = "blur(20px)";

    }

});