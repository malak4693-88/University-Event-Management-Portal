// Wait for page to load
document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
  const headers = table.querySelectorAll("th");

  // === FILTER FUNCTIONALITY ===
  const filterInput = document.createElement("input");
  filterInput.type = "text";
  filterInput.placeholder = "Search events...";
  filterInput.classList.add("form-control", "mb-3");
  table.parentElement.insertBefore(filterInput, table);

  filterInput.addEventListener("keyup", function () {
    const searchValue = this.value.toLowerCase();
    const rows = tbody.querySelectorAll("tr");

    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(searchValue) ? "" : "none";
    });
  });

  // === SORTING FUNCTIONALITY ===
  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => sortTable(index));
  });

  let sortDirection = true;

  function sortTable(columnIndex) {
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const sortedRows = rows.sort((a, b) => {
      const aText = a.children[columnIndex].textContent.trim().toLowerCase();
      const bText = b.children[columnIndex].textContent.trim().toLowerCase();

      // Try converting to date or number if possible
      const aValue = isNaN(Date.parse(aText)) ? aText : Date.parse(aText);
      const bValue = isNaN(Date.parse(bText)) ? bText : Date.parse(bText);

      if (aValue < bValue) return sortDirection ? -1 : 1;
      if (aValue > bValue) return sortDirection ? 1 : -1;
      return 0;
    });

    sortDirection = !sortDirection;
    tbody.innerHTML = "";
    sortedRows.forEach(row => tbody.appendChild(row));
  }
});
