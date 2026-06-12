console.log("SENTINEL GRID INITIALIZED");

/*
=========================================
PAGE LOAD ANIMATION
=========================================
*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {

        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(50px)";

        setTimeout(() => {

            heroContent.style.transition =
                "all 1.8s ease";

            heroContent.style.opacity = "1";
            heroContent.style.transform =
                "translateY(0px)";

        }, 300);

    }

});

/*
=========================================
SMOOTH SCROLL
=========================================
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
=========================================
SCROLL REVEAL EFFECT
=========================================
*/

const revealElements = document.querySelectorAll(
    ".reveal"
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach(element => {

    revealObserver.observe(element);

});

/*
=========================================
PARALLAX HERO EFFECT
=========================================
*/

window.addEventListener("scroll", () => {

    const heroVideo =
        document.querySelector(".hero-video");

    if (heroVideo) {

        const offset = window.scrollY * 0.15;

        heroVideo.style.transform =
            `scale(1.05) translateY(${offset}px)`;

    }

});

/*
=========================================
EMERGENCY PULSE EFFECT
=========================================
*/

const pulse = document.querySelector(".pulse");

if (pulse) {

    setInterval(() => {

        pulse.classList.add("pulse-active");

        setTimeout(() => {

            pulse.classList.remove(
                "pulse-active"
            );

        }, 1200);

    }, 2500);

}

/*
=========================================
SECTION FADE-IN
=========================================
*/

const sections =
    document.querySelectorAll("section");

const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "section-visible"
                    );

                }

            });

        },

        {
            threshold: 0.2
        }

    );

sections.forEach(section => {

    sectionObserver.observe(section);

});

/*
=========================================
CINEMATIC TEXT STAGGER
=========================================
*/

document.querySelectorAll("h1, h2").forEach(title => {

    title.style.opacity = "0";
    title.style.transform =
        "translateY(40px)";

});

window.addEventListener("load", () => {

    document.querySelectorAll("h1, h2")
        .forEach((title, index) => {

            setTimeout(() => {

                title.style.transition =
                    "all 1.2s ease";

                title.style.opacity = "1";

                title.style.transform =
                    "translateY(0)";

            }, 400 + (index * 150));

        });

});

/*
=========================================
DEBUG MESSAGE
=========================================
*/

console.log(
    "Emergency Intelligence Network Online"
);
