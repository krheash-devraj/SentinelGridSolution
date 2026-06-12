/*
====================================================
SENTINEL GRID
Emergency Intelligence Network
====================================================
*/

console.clear();

console.log("SENTINEL GRID ONLINE");
console.log("Emergency Intelligence Network Active");

/*
====================================================
PAGE LOADER
====================================================
*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

/*
====================================================
HERO REVEAL
====================================================
*/

window.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero-content");

    if (hero) {

        hero.style.opacity = "0";
        hero.style.transform = "translateY(60px)";

        setTimeout(() => {

            hero.style.transition =
                "all 1.6s ease";

            hero.style.opacity = "1";
            hero.style.transform =
                "translateY(0px)";

        }, 400);

    }

});

/*
====================================================
SMOOTH SCROLL BUTTONS
====================================================
*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

/*
====================================================
SECTION REVEAL
====================================================
*/

const observerOptions = {

    threshold: 0.15

};

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    observerOptions

);

document
    .querySelectorAll(
        ".crack-content, .vision-content"
    )
    .forEach(section => {

        observer.observe(section);

    });

/*
====================================================
VIDEO PARALLAX
====================================================
*/

const heroVideo =
    document.querySelector(".hero-video");

window.addEventListener("scroll", () => {

    if (!heroVideo) return;

    const scrollY = window.scrollY;

    heroVideo.style.transform =
        `scale(1.08) translateY(${scrollY * 0.15}px)`;

});

/*
====================================================
HEADLINE PARALLAX
====================================================
*/

const heroContent =
    document.querySelector(".hero-content");

window.addEventListener("scroll", () => {

    if (!heroContent) return;

    const scrollY = window.scrollY;

    heroContent.style.transform =
        `translateY(${scrollY * 0.2}px)`;

});

/*
====================================================
PULSE EFFECT ENHANCEMENT
====================================================
*/

const pulse =
    document.querySelector(".pulse");

if (pulse) {

    setInterval(() => {

        pulse.classList.add(
            "pulse-highlight"
        );

        setTimeout(() => {

            pulse.classList.remove(
                "pulse-highlight"
            );

        }, 1200);

    }, 2500);

}

/*
====================================================
DYNAMIC NAV BACKGROUND
Future Use
====================================================
*/

window.addEventListener("scroll", () => {

    const scrolled =
        window.scrollY;

    if (scrolled > 300) {

        document.body.classList.add(
            "scrolled"
        );

    } else {

        document.body.classList.remove(
            "scrolled"
        );

    }

});

/*
====================================================
SCROLL PROGRESS BAR
====================================================
*/

const progressBar =
    document.createElement("div");

progressBar.className =
    "scroll-progress";

document.body.appendChild(
    progressBar
);

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width =
        progress + "%";

});

/*
====================================================
CONSOLE SIGNATURE
====================================================
*/

console.log(`
███████╗███████╗███╗   ██╗████████╗██╗███╗   ██╗███████╗██╗
██╔════╝██╔════╝████╗  ██║╚══██╔══╝██║████╗  ██║██╔════╝██║
███████╗█████╗  ██╔██╗ ██║   ██║   ██║██╔██╗ ██║█████╗  ██║
╚════██║██╔══╝  ██║╚██╗██║   ██║   ██║██║╚██╗██║██╔══╝  ██║
███████║███████╗██║ ╚████║   ██║   ██║██║ ╚████║███████╗███████╗
╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝
`);

console.log("Mission Control Ready");
