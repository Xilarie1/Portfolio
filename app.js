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
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  // Smooth scroll + immediate nav update on click
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute("href").substring(1);
      const section = document.getElementById(sectionId);

      section.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => updateActiveNav(sectionId), 100);
    });
  });

  // ======== EXTERNAL LINKS (all <a> tags) ========
  const links = document.querySelectorAll("a, .projec-links a");
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

  // ======== PROFILE CARD BUTTONS ========
  // GitHub button
  const githubBtn = document.getElementById("github");
  if (githubBtn) {
    githubBtn.addEventListener("click", () => {
      window.open(
        "https://github.com/Xilarie1",
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

  // LinkedIn button
  const linkedinBtn = document.getElementById("linkedin");
  if (linkedinBtn) {
    linkedinBtn.addEventListener("click", () => {
      window.open(
        "https://www.linkedin.com/in/martin-krogh-a58360132/",
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

  // Kontakt button
  const kontaktBtn = document.getElementById("kontakt");
  if (kontaktBtn) {
    kontaktBtn.addEventListener("click", () => {
      const kontaktSection = document.getElementById("contact");
      if (kontaktSection) {
        kontaktSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
