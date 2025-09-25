document.addEventListener("DOMContentLoaded", () => {
  // ======== NAVIGATION HIGHLIGHT ========
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");

  function updateActiveNav(sectionId) {
    navItems.forEach((item) => {
      item.classList.toggle(
        "active",
        item.getAttribute("href") === `#${sectionId}`
      );
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) updateActiveNav(entry.target.id);
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => observer.observe(section));

  // ======== EXTERNAL LINKS ========
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    if (link.hostname !== window.location.hostname) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  // ======== COPY TO CLIPBOARD TOOLTIP ========
  const fields = document.querySelectorAll(".copy-field");
  const tooltip = document.getElementById("tooltip");

  function showTooltipAbove(element) {
    const rect = element.getBoundingClientRect();
    tooltip.style.position = "fixed";
    tooltip.style.top = rect.top - 30 + "px";
    tooltip.style.left = rect.left + rect.width / 2 + "px";
    tooltip.classList.add("show");
    setTimeout(() => tooltip.classList.remove("show"), 1500);
  }

  fields.forEach((field) => {
    field.addEventListener("click", () => {
      const text = field.textContent.trim();
      navigator.clipboard.writeText(text).then(() => showTooltipAbove(field));
    });
  });
});
