document.addEventListener("DOMContentLoaded", () => {
    const panelContentParent = document.querySelector(".panelContentParent");

    let isDragging = false;

    const onDragStart = (event) => {
        isDragging = true;
        document.body.classList.add("dragging");
        event.preventDefault();
    };

    const onDragEnd = () => {
        if (isDragging) {
            isDragging = false;
            document.body.classList.remove("dragging");
        }
    };

    // Add event listeners for mouse and touch events
    panelContentParent.addEventListener("mousedown", onDragStart);
    panelContentParent.addEventListener("touchstart", onDragStart);
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchend", onDragEnd);
    document.addEventListener("mouseleave", onDragEnd);
});
