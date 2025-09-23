document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section"); // all sections in main
  const navItems = document.querySelectorAll(".nav-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${entry.target.id}`) {
              item.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.6, // at least 60% visible
    }
  );

  sections.forEach((section) => observer.observe(section));
});
