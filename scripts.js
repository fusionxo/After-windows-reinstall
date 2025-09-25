document.addEventListener("DOMContentLoaded", function () {
  const softwareButtons = document.querySelectorAll(".software-button");
  const cursorDot = document.createElement("div");
  cursorDot.classList.add("cursor-dot");
  document.body.appendChild(cursorDot);
  const searchBar = document.getElementById("search-bar");
  const categoryContainers = document.querySelectorAll(".category-container");

  // --- Cursor Dot Logic ---
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y + window.scrollY}px`;
  });

  document.addEventListener("mousedown", function (e) {
    if (e.button === 0) {
      cursorDot.classList.add("clicked");
    }
  });

  document.addEventListener("mouseup", function () {
    cursorDot.classList.remove("clicked");
  });

  // --- Software Button Interaction ---
  softwareButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const link = button.getAttribute("data-link");
      window.open(link, '_blank'); // Open in new tab
    });

    button.addEventListener("mouseenter", function () {
      cursorDot.classList.add("hovered");
    });

    button.addEventListener("mouseleave", function () {
      cursorDot.classList.remove("hovered");
    });
  });

  // --- Search Bar Functionality ---
  searchBar.addEventListener("input", () => {
    const searchTerm = searchBar.value.toLowerCase();

    categoryContainers.forEach(container => {
      let hasVisibleButton = false;
      const buttons = container.querySelectorAll(".software-button");

      buttons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes(searchTerm)) {
          button.classList.remove("hidden");
          hasVisibleButton = true;
        } else {
          button.classList.add("hidden");
        }
      });

      if (hasVisibleButton) {
        container.classList.remove("hidden");
      } else {
        container.classList.add("hidden");
      }
    });
  });
});