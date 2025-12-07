// Theme Management
let currentTheme = "dark"

function initTheme() {
  const savedTheme = localStorage.getItem("theme")
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  currentTheme = savedTheme || systemTheme

  document.documentElement.classList.toggle("dark", currentTheme === "dark")
  updateThemeLabel()
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light"
  localStorage.setItem("theme", currentTheme)
  document.documentElement.classList.toggle("dark", currentTheme === "dark")
  updateThemeLabel()
}

function updateThemeLabel() {
  const label = document.querySelector(".mobile-theme-label")
  if (label) {
    label.textContent = currentTheme === "light" ? "Dark Mode" : "Light Mode"
  }
}

// Mobile Menu Management
let mobileMenuOpen = false

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen
  const menu = document.querySelector(".mobile-menu")
  const btn = document.querySelector(".mobile-menu-btn")

  if (mobileMenuOpen) {
    menu.classList.add("show")
    btn.classList.add("open")
  } else {
    menu.classList.remove("show")
    btn.classList.remove("open")
  }
}

// Scroll Management
let isScrolled = false
let activeSection = "home"

function handleScroll() {
  const scrollY = window.scrollY
  const newScrolled = scrollY > 50

  if (newScrolled !== isScrolled) {
    isScrolled = newScrolled
    const nav = document.querySelector(".nav-pill")
    if (nav) {
      nav.classList.toggle("scrolled", isScrolled)
    }
  }

  // Update active section based on scroll position
  const sections = document.querySelectorAll("section[id]")
  let currentSection = "home"

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150
    const sectionBottom = sectionTop + section.offsetHeight

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      currentSection = section.id
    }
  })

  if (currentSection !== activeSection) {
    activeSection = currentSection
    updateActiveLinks()
  }
}

function updateActiveLinks() {
  // Update desktop nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    const section = link.getAttribute("data-section")
    if (section === activeSection) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Update mobile nav links
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    const section = link.getAttribute("data-section")
    if (section === activeSection) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 100
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

// Intersection Observer for sections
function initIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection = entry.target.id
          updateActiveLinks()
        }
      })
    },
    { threshold: 0.3 },
  )

  const sections = document.querySelectorAll("section[id]")
  sections.forEach((section) => observer.observe(section))
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  initIntersectionObserver()
  window.addEventListener("scroll", handleScroll)

  // Set smooth scrolling
  document.documentElement.style.scrollBehavior = "smooth"

  // Initial update of active links
  updateActiveLinks()
})

// Additional functionality for responsive design
function handleResize() {
  if (window.innerWidth > 768) {
    mobileMenuOpen = false
    const menu = document.querySelector(".mobile-menu")
    const btn = document.querySelector(".mobile-menu-btn")
    if (menu) {
      menu.classList.remove("show")
    }
    if (btn) {
      btn.classList.remove("open")
    }
  }
}

window.addEventListener("resize", handleResize)
