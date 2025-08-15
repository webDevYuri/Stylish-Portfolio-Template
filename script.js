const AOS = window.AOS

AOS.init({
  duration: 1200,
  once: true,
  offset: 50,
  easing: "ease-out-cubic",
  delay: 0,
  anchorPlacement: "top-bottom",
})

const navbar = document.getElementById("navbar")
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll("section[id]")

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })

      const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
      mobileNavLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

const throttle = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const handleScroll = throttle(() => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
  updateActiveNavLink()
})

window.addEventListener("scroll", handleScroll)

const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const mobileMenu = document.getElementById("mobile-menu")
const hamburger = mobileMenuBtn.querySelector(".hamburger")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
const mobileCloseBtn = document.getElementById("mobile-close-btn")

function closeMobileMenu() {
  mobileMenu.classList.remove("active")
  hamburger.classList.remove("active")
  document.body.style.overflow = "auto"
}

function openMobileMenu() {
  mobileMenu.classList.add("active")
  hamburger.classList.add("active")
  document.body.style.overflow = "hidden"
}

mobileMenuBtn.addEventListener("click", () => {
  if (mobileMenu.classList.contains("active")) {
    closeMobileMenu()
  } else {
    openMobileMenu()
  }
})

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener("click", closeMobileMenu)
}

mobileNavLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu)
})

mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) {
    closeMobileMenu()
  }
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

function scrollDown() {
  window.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: "smooth",
  })
}

function scrollUp() {
  window.scrollBy({
    top: -window.innerHeight,
    left: 0,
    behavior: "smooth",
  })
}

const contactForm = document.getElementById("contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")
    if (name && email && subject && message) {
      showNotification("Thank you for your message! I'll get back to you soon.", "success")
      contactForm.reset()
    } else {
      showNotification("Please fill in all fields.", "error")
    }
  })
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg text-white z-50 transform translate-x-full transition-transform duration-300 ${
    type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
  }`
  notification.textContent = message
  document.body.appendChild(notification)
  setTimeout(() => {
    notification.classList.remove("translate-x-full")
  }, 100)
  setTimeout(() => {
    notification.classList.add("translate-x-full")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

const projectItems = document.querySelectorAll(".project-item")
projectItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.backgroundColor = "rgba(255, 107, 53, 0.05)"
  })
  item.addEventListener("mouseleave", () => {
    item.style.backgroundColor = "transparent"
  })
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".experience-badge")
  parallaxElements.forEach((element) => {
    const speed = 0.3
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")
    }
  })
}, observerOptions)

document.querySelectorAll(".service-card, .service-card-dark, .testimonial-card, .portfolio-image").forEach((el) => {
  observer.observe(el)
})

const newsletterForm = document.querySelector("footer form")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = e.target.querySelector('input[type="email"]').value
    if (email) {
      showNotification("Thank you for subscribing to our newsletter!", "success")
      e.target.reset()
    } else {
      showNotification("Please enter a valid email address.", "error")
    }
  })
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    closeMobileMenu()
  }
})

document.addEventListener("DOMContentLoaded", () => {
  updateActiveNavLink()
  const elementsToAnimate = document.querySelectorAll("h1, h2, h3, p, .service-card, .testimonial-card")
  elementsToAnimate.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    setTimeout(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, index * 50)
  })
})

const revealSections = document.querySelectorAll("section")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

revealSections.forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  revealObserver.observe(section)
})

const flipCards = document.querySelectorAll(".flip-card")
flipCards.forEach((card) => {
  let isFlipped = false
  card.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault()
      const inner = card.querySelector(".flip-card-inner")
      if (!isFlipped) {
        inner.style.transform = "rotateY(180deg)"
        isFlipped = true
      } else {
        inner.style.transform = "rotateY(0deg)"
        isFlipped = false
      }
    }
  })
  card.addEventListener("mouseleave", () => {
    if (window.innerWidth <= 768 && isFlipped) {
      setTimeout(() => {
        const inner = card.querySelector(".flip-card-inner")
        inner.style.transform = "rotateY(0deg)"
        isFlipped = false
      }, 3000)
    }
  })
})

AOS.refresh()