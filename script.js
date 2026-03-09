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
                { threshold: 0.3 }
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



});