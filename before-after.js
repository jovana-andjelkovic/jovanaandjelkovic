(function () {
    const compares = document.querySelectorAll("[data-compare]");

    compares.forEach((el) => {
        const handle = el.querySelector(".compare-handle");
        if (!handle) return;

        let dragging = false;

        const setPos = (pct) => {
            const clamped = Math.max(0, Math.min(100, pct));
            el.style.setProperty("--compare-pos", clamped + "%");
            handle.setAttribute("aria-valuenow", Math.round(clamped));
        };

        const posFromEvent = (clientX) => {
            const rect = el.getBoundingClientRect();
            return ((clientX - rect.left) / rect.width) * 100;
        };

        const onPointerMove = (e) => {
            if (!dragging) return;
            setPos(posFromEvent(e.clientX));
        };

        const onPointerUp = () => {
            dragging = false;
            el.classList.remove("is-dragging");
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };

        const startDrag = (e) => {
            dragging = true;
            el.classList.add("is-dragging");
            setPos(posFromEvent(e.clientX));
            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
        };

        handle.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            handle.focus();
            startDrag(e);
        });

        el.addEventListener("pointerdown", (e) => {
            if (e.target === handle || handle.contains(e.target)) return;
            startDrag(e);
        });

        handle.addEventListener("keydown", (e) => {
            const current = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
            const step = e.shiftKey ? 10 : 2;
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                setPos(current - step);
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                setPos(current + step);
            } else if (e.key === "Home") {
                e.preventDefault();
                setPos(0);
            } else if (e.key === "End") {
                e.preventDefault();
                setPos(100);
            }
        });
    });
})();
