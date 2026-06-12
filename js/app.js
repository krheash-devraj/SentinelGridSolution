console.log("🚨 Sentinel Grid Initialized");

/*
    Simple hover glow effect
*/

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.boxShadow =
                "0 0 20px rgba(0,229,255,0.5)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "none";
        });

    });

});

/*
    Smooth scroll enhancement
*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(
            this.getAttribute("href")
        ).scrollIntoView({
            behavior: "smooth"
        });

    });

});
