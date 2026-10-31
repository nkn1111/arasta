const clamp = (v) => Math.min(1, Math.max(0, v));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Split the story statement into words so CSS can light them up one by one
document.querySelectorAll("[data-words]").forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.style.setProperty("--n", words.length);
  el.innerHTML = words.map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(" ");
});

// Scroll progress: each pinned [data-scroll] section gets --p from 0 to 1 while it is stuck.
const scrollers = [...document.querySelectorAll("[data-scroll]")];
let ticking = false;

function updateScroll() {
  ticking = false;
  const vh = innerHeight;
  for (const el of scrollers) {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--p", clamp(-r.top / Math.max(1, r.height - vh)).toFixed(4));
  }
}

addEventListener("scroll", () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateScroll);
  }
}, { passive: true });
addEventListener("resize", updateScroll);
updateScroll();

// Count the numbers up once they come into view
const counters = document.querySelectorAll("[data-count]");
if (!reduceMotion && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      io.unobserve(target);
      const end = Number(target.dataset.count), dp = Number(target.dataset.decimals || 0), start = performance.now();
      const tick = (now) => {
        const k = clamp((now - start) / 1400);
        target.textContent = (end * (1 - (1 - k) ** 3)).toFixed(dp);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });
  counters.forEach((el) => { el.textContent = (0).toFixed(Number(el.dataset.decimals || 0)); io.observe(el); });
}

// Menu tabs (without JS every category stays listed)
const menu = document.getElementById("menu");
const tabs = [...menu.querySelectorAll('[role="tab"]')];

function selectTab(tab, focus = false) {
  for (const t of tabs) {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  }
  if (focus) tab.focus();
}

menu.classList.add("has-tabs");
selectTab(tabs[0]);
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (step) selectTab(tabs[(i + step + tabs.length) % tabs.length], true);
  });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

if (navToggle && navLinks) {
  const setOpen = (open) => {
    navLinks.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };

  navToggle.addEventListener("click", () => setOpen(!navLinks.classList.contains("is-open")));
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Signup form submit via fetch (Formspree) so the page never reloads
const signupForm = document.getElementById("signup-form");
const formStatus = document.getElementById("form-status");

if (signupForm && formStatus) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (signupForm.action.includes("YOUR_FORMSPREE_ID")) {
      formStatus.textContent = "Signup isn't connected yet. Email hello@arasta.coffee to join the list.";
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
        formStatus.textContent = "You're on the list. See you at the bar.";
        formStatus.className = "form-status success";
        signupForm.reset();
      } else {
        formStatus.textContent = "Signup didn't go through. Check your email address and try again.";
        formStatus.className = "form-status error";
      }
    } catch (error) {
      formStatus.textContent = "No connection. Check your internet and try again.";
      formStatus.className = "form-status error";
    } finally {
      submitButton.disabled = false;
    }
  });
}
