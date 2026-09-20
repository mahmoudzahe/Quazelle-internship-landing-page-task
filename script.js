document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {

        const target = Number(counter.dataset.target);
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";

        const duration = 1500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const currentValue = Math.floor(progress * target);

            counter.textContent =
                prefix +
                currentValue.toLocaleString() +
                suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }

        };

        requestAnimationFrame(updateCounter);
    };


    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );


    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });


    const navLinks = document.querySelectorAll(".nav a");
    const sections = document.querySelectorAll("main section[id]");

    const updateActiveLink = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 160;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();

});