const form = document.getElementById('Registrationform');

form.addEventListener("submit", function (event) {
    let valid = true;

    // Clear previous errors (guard elements exist)
    const clearIfExists = id => { const el = document.getElementById(id); if (el) el.textContent = ""; };
    ["nameError","emailError","idError","eventError","dateError"].forEach(clearIfExists);

    // Name validation
    const name = document.getElementById("name");
    if (!name || name.value.trim().length < 3) {
        const el = document.getElementById("nameError"); if (el) el.textContent = "Name must be at least 3 characters.";
        valid = false;
    }

    // Email validation
    const email = document.getElementById("email");
    if (!email || email.validity.valueMissing) {
        const el = document.getElementById("emailError"); if (el) el.textContent = "Email is required.";
        valid = false;
    } else if (email.validity.typeMismatch) {
        const el = document.getElementById("emailError"); if (el) el.textContent = "Enter a valid email address.";
        valid = false;
    }

    // ID validation
    const studentId = document.getElementById("StudentID");
    if (!studentId || studentId.validity.valueMissing) {
        const el = document.getElementById("idError"); if (el) el.textContent = "Student ID is required.";
        valid = false;
    } else if (studentId.validity.patternMismatch) {
        const el = document.getElementById("idError"); if (el) el.textContent = "ID must be 4 digits only.";
        valid = false;
    }

    // Event validation
    const eventSelect = document.getElementById("event");
    if (!eventSelect || eventSelect.value === "") {
        const el = document.getElementById("eventError"); if (el) el.textContent = "Please select an event.";
        valid = false;
    }

    // Date validation
    const date = document.getElementById("Date");
    if (!date || date.validity.valueMissing) {
        const el = document.getElementById("dateError"); if (el) el.textContent = "Please choose a date.";
        valid = false;
    }

    // Prevent submit only when there are validation errors
    if (!valid) {
        event.preventDefault();
    }

});
