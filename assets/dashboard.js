// Theme Toggle using Font Awesome icons
function toggleTheme() {
  const html = document.documentElement;
  const themeToggleIcon = document.querySelector(".theme-toggle i");
  const isDark = html.getAttribute("data-theme") === "dark";

  // Toggle theme attribute on the root element
  html.setAttribute("data-theme", isDark ? "light" : "dark");

  if (isDark) {
    // Switching from dark to light: show moon icon (indicating you can switch to dark)
    themeToggleIcon.classList.remove("fa-sun");
    themeToggleIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    // Switching from light to dark: show sun icon (indicating you can switch to light)
    themeToggleIcon.classList.remove("fa-moon");
    themeToggleIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  }
}

// Set initial theme from localStorage or default to light
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);

const themeToggleIcon = document.querySelector(".theme-toggle i");
if (savedTheme === "dark") {
  themeToggleIcon.classList.remove("fa-moon");
  themeToggleIcon.classList.add("fa-sun");
} else {
  themeToggleIcon.classList.remove("fa-sun");
  themeToggleIcon.classList.add("fa-moon");
}

// Dashboard and section functionality (same as before)
// ... (rest of your JavaScript remains the same) ...

// Dashboard Dynamic Resizing
function resizeDashboard() {
  const iframe = document.getElementById("powerbi-iframe");
  const container = iframe.parentElement;
  const aspectRatio = parseFloat(iframe.dataset.aspectRatio) || 1.777;
  const containerWidth = container.offsetWidth;
  const calculatedHeight = containerWidth / aspectRatio;

  container.style.height = `${calculatedHeight}px`;
  iframe.style.height = `${calculatedHeight}px`;
}

// Dashboard Loading Handler
function loadDashboard() {
  const iframe = document.getElementById("powerbi-iframe");
  const loader = document.querySelector(".dashboard-loader");
  const error = document.querySelector(".dashboard-error");

  iframe.style.opacity = "0";
  loader.style.display = "block";
  error.style.display = "none";

  iframe.onload = () => {
    iframe.style.opacity = "1";
    loader.style.display = "none";
  };

  iframe.onerror = () => {
    loader.style.display = "none";
    error.style.display = "block";
  };

  if (!iframe.src) {
    iframe.src = iframe.dataset.src;
  } else {
    iframe.contentWindow.location.reload();
  }
}

// Section Expand/Collapse
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const header = section.querySelector(".section-header");
    const content = section.querySelector(".section-content");
    const toggle = section.querySelector(".section-toggle");

    header.addEventListener("click", () => {
      // Close other sections
      sections.forEach((otherSection) => {
        if (otherSection !== section) {
          otherSection
            .querySelector(".section-content")
            .classList.remove("active");
          otherSection.querySelector(".section-toggle").textContent = "+";
        }
      });

      // Toggle current section
      content.classList.toggle("active");
      toggle.textContent = content.classList.contains("active") ? "−" : "+";
    });
  });
});

// Initialize
window.addEventListener("load", () => {
  resizeDashboard();
  loadDashboard();
  window.addEventListener("resize", resizeDashboard);
});

// Global Error Handling
window.addEventListener("error", (e) => {
  console.error("Error:", e.error);
  document.querySelector(".dashboard-error").style.display = "block";
});
