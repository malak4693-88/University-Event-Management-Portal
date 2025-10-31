// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  body.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  body.style.opacity = 1;
  body.style.transform = "translateX(0)";

  // Page transition on login/signup switch
  document.querySelectorAll("button, a").forEach(el => {
    el.addEventListener("click", (e) => {
      const href = el.getAttribute("onclick") || el.getAttribute("href");
      if (href && href.includes(".html")) {
        e.preventDefault();
        body.style.opacity = 0;
        body.style.transform = "translateX(-30px)";
        setTimeout(() => {
          window.location.href = href.replace("window.location.href='", "").replace("'", "");
        }, 400);
      }
    });
  });

  // Password confirmation check for signup page
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (password !== confirmPassword) {
        e.preventDefault();
        alert("⚠️ Passwords do not match!");
      }
    });
  }

  // Simple login validation demo (for design purposes)
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        e.preventDefault();
        alert("Please enter your email and password.");
      }
    });
  }
});
