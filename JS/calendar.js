document.addEventListener("DOMContentLoaded", function () {
  // ===== Highlight today's date =====
  const today = new Date();
  const currentMonth = 10; // November (0-based index)
  const currentYear = 2025;

  if (today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
    const day = today.getDate();
    const cells = document.querySelectorAll("#calendarTable td");

    cells.forEach(td => {
      // Match exact day number (handles cells with <br> and <small>)
      const text = td.textContent.trim().split("\n")[0];
      if (parseInt(text) === day) {
        td.classList.add("today");
    }
  })
  }

  // ===== Define your events =====
  const events = {
    22: {
      title: "Annual Scientific Day",
      description: "Join us for research presentations and academic showcases."
    },
    28: {
      title: "Team Meeting",
      description: "Final coordination meeting for semester projects."
    }
  };

  // ===== Click event to show event details =====
  const tableCells = document.querySelectorAll("#calendarTable td");
  tableCells.forEach(td => {
    td.addEventListener("click", () => {
      const day = parseInt(td.textContent);
      if (!day || isNaN(day)) return;

      const event = events[day];
      if (event) {
        alert(`📅 ${event.title}\n\n${event.description}`);
      } else {
        alert(`No events scheduled for ${day} November 2025.`);
      }
    });
  });

  // ===== Search Feature =====
  const searchInput = document.getElementById("eventSearch");
  const upcomingList = document.querySelector("#upcomingEvents ul");

  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    const items = upcomingList.querySelectorAll("li");

    items.forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
  });
});