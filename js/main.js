// Smooth-scroll only for in-page anchor links (not global wheel scroll)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Signup form submit via fetch (Formspree) so the page never reloads
const signupForm = document.getElementById("signup-form");
const formStatus = document.getElementById("form-status");

if (signupForm && formStatus) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (signupForm.action.includes("YOUR_FORMSPREE_ID")) {
      formStatus.textContent = "Signup isn't wired up yet — add your Formspree form ID in index.html.";
      formStatus.className = "form-status error";
      return;
    }

    const submitButton = signupForm.querySelector("button[type=submit]");
    submitButton.disabled = true;
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      const response = await fetch(signupForm.action, {
        method: "POST",
        body: new FormData(signupForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formStatus.textContent = "Thanks — you're on the list!";
        formStatus.className = "form-status success";
        signupForm.reset();
      } else {
        formStatus.textContent = "Something went wrong. Please try again.";
        formStatus.className = "form-status error";
      }
    } catch (error) {
      formStatus.textContent = "Network error — please try again.";
      formStatus.className = "form-status error";
    } finally {
      submitButton.disabled = false;
    }
  });
}
