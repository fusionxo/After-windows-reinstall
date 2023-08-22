document.addEventListener("DOMContentLoaded", function () {
  const softwareButtons = document.querySelectorAll(".software-button");
  const cursorDot = document.createElement("div");
  cursorDot.classList.add("cursor-dot");
  document.body.appendChild(cursorDot);

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

  document.addEventListener("mouseup", function (e) {
    cursorDot.classList.remove("clicked");
  });

  softwareButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      cursorDot.classList.add("clicked");
      setTimeout(() => {
        cursorDot.classList.remove("clicked");
      }, 100);

      const link = button.getAttribute("data-link");
      smoothScrollToTop(() => {
        window.location.href = link;
      });
    });

    button.addEventListener("mouseenter", function () {
      cursorDot.classList.add("hovered");
    });

    button.addEventListener("mouseleave", function () {
      cursorDot.classList.remove("hovered");
    });
  });

  function smoothScrollToTop(callback) {
    const start = window.scrollY || window.pageYOffset;
    const target = 0;
    const distance = target - start;
    const duration = 0;
    const startTime = performance.now();

    function easeInOutQuad(time, start, distance, duration) {
      time /= duration / 2;
      if (time < 1) return (distance / 2) * time * time + start;
      time--;
      return (-distance / 2) * (time * (time - 2) - 1) + start;
    }

    function scroll(timestamp) {
      const currentTime = timestamp - startTime;
      const newPos = easeInOutQuad(currentTime, start, distance, duration);
      window.scrollTo(0, newPos);
      if (currentTime < duration) {
        requestAnimationFrame(scroll);
      } else {
        callback();
      }
    }

    requestAnimationFrame(scroll);
  }
});
