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

  // Highlight the first section immediately on load
  updateActiveNav(sections[0].id);

  // IntersectionObserver setup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) updateActiveNav(entry.target.id);
      });
    },
    { threshold: 0.5 } // lower threshold for better detection
  );

  sections.forEach((section) => observer.observe(section));

  // Smooth scroll + immediate nav update on click
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault(); // stop default anchor jump
      const sectionId = item.getAttribute("href").substring(1);
      const section = document.getElementById(sectionId);

      section.scrollIntoView({ behavior: "smooth" });

      // Delay slightly to let scroll happen before updating nav
      setTimeout(() => updateActiveNav(sectionId), 100);
    });
  });

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
      const text = field.querySelector("span").textContent.trim();
      navigator.clipboard.writeText(text).then(() => showTooltipAbove(field));
    });
  });
});
