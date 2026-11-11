// Portfolio theme handling with localStorage persistence.
const STORAGE_KEY = "portfolio-theme";
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle__icon");
const themeLabel = document.querySelector(".theme-toggle__label");

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("theme-dark", isDark);
  document.body.classList.toggle("theme-light", !isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";

  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeLabel.textContent = isDark ? "Light" : "Dark";

  localStorage.setItem(STORAGE_KEY, theme);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);
}

if (themeToggle && themeIcon && themeLabel) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
    applyTheme(nextTheme);
  });

  initializeTheme();
}
