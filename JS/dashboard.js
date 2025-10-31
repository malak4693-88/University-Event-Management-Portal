document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("eventsTable");
  const rows = table.querySelectorAll("tbody tr");
  const statusCells = table.querySelectorAll("tbody td:last-child");

  // ===== Color-code event statuses =====
  statusCells.forEach(cell => {
    const status = cell.textContent.trim().toLowerCase();
    if (status === "accepted") {
      cell.style.color = "#2ECC71"; // green
      cell.style.fontWeight = "bold";
    } else if (status === "rejected") {
      cell.style.color = "#E74C3C"; // red
      cell.style.fontWeight = "bold";
    } else if (status === "pending") {
      cell.style.color = "#F39C12"; // orange
      cell.style.fontWeight = "bold";
    }
  });

  // ===== Count and update summary cards =====
  let accepted = 0, rejected = 0, pending = 0;
  statusCells.forEach(cell => {
    const s = cell.textContent.trim().toLowerCase();
    if (s === "accepted") accepted++;
    else if (s === "rejected") rejected++;
    else if (s === "pending") pending++;
  });

  const total = accepted + rejected + pending;
  const cards = document.querySelectorAll(".stat-card p");
  if (cards.length >= 4) {
    cards[0].textContent = total;
    cards[1].textContent = accepted;
    cards[2].textContent = pending;
    cards[3].textContent = rejected;
  }

  // ===== Filter by status =====
  const filter = document.getElementById("statusFilter");
  filter.addEventListener("change", () => {
    const selected = filter.value.toLowerCase();
    rows.forEach(row => {
      const status = row.cells[4].textContent.trim().toLowerCase();
      row.style.display = (selected === "all" || status === selected) ? "" : "none";
    });
  });

  console.log("Dashboard loaded successfully ✅");
});

// ===== Sort Table Function =====
function sortTable(columnIndex) {
  const table = document.getElementById("eventsTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const asc = table.getAttribute("data-sort-asc") === "true" ? false : true;
  table.setAttribute("data-sort-asc", asc);

  rows.sort((a, b) => {
    let valA = a.cells[columnIndex].textContent.trim().toLowerCase();
    let valB = b.cells[columnIndex].textContent.trim().toLowerCase();

    // Convert date column properly
    if (columnIndex === 2) {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (valA < valB) return asc ? -1 : 1;
    if (valA > valB) return asc ? 1 : -1;
    return 0;
  });

  // Reorder rows
  rows.forEach(row => tbody.appendChild(row));
}