document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const firstHr = container.querySelector("hr");

  // === Create Search Box ===
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search upcoming events...";
  searchInput.classList.add("form-control", "search-input");
  container.insertBefore(searchInput, firstHr.nextSibling);

  // === Filter Functionality ===
  searchInput.addEventListener("keyup", function () {
    const query = this.value.toLowerCase();
    const eventBoxes = document.querySelectorAll(".event-box");

    eventBoxes.forEach(box => {
      box.style.display = box.textContent.toLowerCase().includes(query)
        ? ""
        : "none";
    });
  });

  // === Highlight Nearest Upcoming Event ===
  const today = new Date();
  const eventBoxes = document.querySelectorAll(".event-box");
  let nearestBox = null;
  let nearestDate = Infinity;

  eventBoxes.forEach(box => {
    const text = box.textContent;
    const match = text.match(/(\b\w+\b) (\d{1,2}), (\d{4})/); // e.g., Oct 25, 2025
    if (match) {
      const eventDate = new Date(`${match[1]} ${match[2]}, ${match[3]}`);
      if (eventDate > today && eventDate < nearestDate) {
        nearestDate = eventDate;
        nearestBox = box;
      }
    }
  });

  if (nearestBox) {
    nearestBox.classList.add("event-highlight");
    nearestBox.insertAdjacentHTML("beforeend", " 🌟");
  }
});

