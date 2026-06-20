/*
====================================================
SENTINEL23™
Emergency Intelligence Network
====================================================
*/

console.clear();

console.log("SENTINEL23™ ONLINE");
console.log("Mission Control Ready");

/*
====================================================
SECTION REVEAL ANIMATION
====================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    document
        .querySelectorAll(
            ".crack-content, .vision-content"
        )
        .forEach(section => {

            observer.observe(section);

        });

});

/*
====================================================
SMOOTH SCROLL
====================================================
*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
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
SCROLL PROGRESS BAR
====================================================
*/

const progressBar = document.createElement("div");

progressBar.className = "scroll-progress";

document.body.appendChild(progressBar);

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
PULSE ENHANCEMENT
====================================================
*/

const pulse = document.querySelector(".pulse");

if (pulse) {

    setInterval(() => {

        pulse.classList.add("pulse-highlight");

        setTimeout(() => {

            pulse.classList.remove(
                "pulse-highlight"
            );

        }, 800);

    }, 2200);

}
