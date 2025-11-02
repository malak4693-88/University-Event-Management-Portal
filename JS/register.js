document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("Registrationform");
  const tableBody = document.querySelector("#participantsTable tbody");
  const table = document.getElementById("participantsTable");

  // Create search filter above table
  const filterContainer = document.createElement("div");
  filterContainer.classList.add("mb-3");
  filterContainer.innerHTML = `
      <input type="text" id="filterInput" class="form-control" placeholder="🔍 Filter by name, event, or hall">
  `;
  table.parentNode.insertBefore(filterContainer, table);

  const filterInput = document.getElementById("filterInput");

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const studentID = document.getElementById("StudentID").value.trim();
    const eventName = document.getElementById("event").value.trim();
    const description = document.getElementById("description").value.trim();
    const hall = document.getElementById("hall").value.trim();
    const date = document.getElementById("Date").value;
    const period = document.getElementById("Period").value;

    // Check if all required fields are filled
    if (!name || !email || !studentID || !eventName || !hall || !date || !period) {
      alert("⚠️ Please fill out all required fields!");
      return;
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${studentID}</td>
      <td>${eventName}</td>
      <td>${hall}</td>
      <td>${date}</td>
      <td>${period}</td> <!-- Added period to the table -->
    `;
    tableBody.appendChild(newRow);
    form.reset();
    alert("✅ Registration successful!");
  });

  // Filter table rows dynamically
  filterInput.addEventListener("keyup", function () {
    const filterValue = filterInput.value.toLowerCase();
    const rows = tableBody.getElementsByTagName("tr");
    Array.from(rows).forEach(row => {
      const match = Array.from(row.getElementsByTagName("td"))
        .some(cell => cell.textContent.toLowerCase().includes(filterValue));
      row.style.display = match ? "" : "none";
    });
  });

  // Enable sorting by clicking headers
  const headers = table.querySelectorAll("th");
  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => sortTable(index));
  });

  function sortTable(columnIndex) {
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    const asc = headers[columnIndex].classList.toggle("asc");
    rows.sort((a, b) => {
      const A = a.children[columnIndex].textContent.toLowerCase();
      const B = b.children[columnIndex].textContent.toLowerCase();
      return asc ? A.localeCompare(B) : B.localeCompare(A);
    });
    tableBody.innerHTML = "";
    rows.forEach(r => tableBody.appendChild(r));
  }
});
