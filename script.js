document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       TABLE: SCROLL ANIMATION + CLICK
       ===================================== */

    const table = document.querySelector(".main-table");

    if (table) {
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach((row, index) => {
            const rowObserver = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            row.style.animationDelay = `${index * 0.2}s`;
                            row.classList.add("animate");
                            obs.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            rowObserver.observe(row);
        });

        rows.forEach(row => {
            const link = row.getAttribute("data-link");

            if (link) {
                row.style.cursor = "pointer";
                row.setAttribute("tabindex", "0");

                row.addEventListener("click", () => {
                    window.location.href = link;
                });

                row.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        window.location.href = link;
                    }
                });
            }
        });
    }

    /* =====================================
       SHLOKA PLAYBACK ON FIRST SCROLL
       ===================================== */

    const shlokaSrc = document.body.getAttribute("data-shloka");
    if (!shlokaSrc) return;

    const shlokaAudio = new Audio(shlokaSrc);
    shlokaAudio.volume = 0.4;
    shlokaAudio.preload = "auto";

    let hasPlayed = false;

    const playOnFirstScroll = () => {
        if (hasPlayed) return;

        shlokaAudio.play().catch(() => {});
        hasPlayed = true;

        window.removeEventListener("scroll", playOnFirstScroll);
        window.removeEventListener("touchmove", playOnFirstScroll);
    };

    // Desktop & mobile scroll
    window.addEventListener("scroll", playOnFirstScroll, { once: true });
    window.addEventListener("touchmove", playOnFirstScroll, { once: true });


    /* =====================================
       TAB SWITCH BEHAVIOR
       ===================================== */

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            // Pause ONLY (do NOT reset)
            shlokaAudio.pause();
        } else {
            // Resume automatically if already played
            if (hasPlayed) {
                shlokaAudio.play().catch(() => {});
            }
        }
    });


    /* =====================================
       STOP AUDIO ON PAGE LEAVE / REFRESH
       ===================================== */

    window.addEventListener("beforeunload", () => {
        shlokaAudio.pause();
        shlokaAudio.currentTime = 0;
    });

});