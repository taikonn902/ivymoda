document.addEventListener("DOMContentLoaded", () => {
    console.log("GSAP loaded:", typeof gsap);
    console.log("ScrollTrigger loaded:", typeof ScrollTrigger);

    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded!");
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    console.log("Timeline created");

    // HEADER - animate immediately
    const header = document.querySelector("#header-page");
    if (header) {
        console.log("Animating header");
        gsap.set(header, { y: -1000, opacity: 0 });
        tl.to(header, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out"
        });
    }

    // NAV LEFT - animate immediately
    const navLeft = document.querySelector("#nav-left");
    if (navLeft) {
        console.log("Animating nav-left");
        gsap.set(navLeft, { x: -100, opacity: 0 });
        tl.to(navLeft, {
            x: 0,
            opacity: 1,
            duration: 0.5
        }, "+=0.3");
    }

    // NAV RIGHT - animate immediately
    const navRight = document.querySelector("#right-header");
    if (navRight) {
        console.log("Animating right-header");
        gsap.set(navRight, { x: 80, opacity: 0 });
        tl.to(navRight, {
            x: 0,
            opacity: 1,
            duration: 0.5
        }, "<");
    }

    // BANNER - animate on scroll
    const banner = document.querySelector("#banner-page");
    if (banner) {
        console.log("Setting up banner scroll animation");
        gsap.set(banner, { y: 200, opacity: 0 });
        gsap.to(banner, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: banner,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    }

    console.log("Animation setup completed");
});
