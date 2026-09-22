/* Your JS here. */

const navbar = document.getElementById('navbar');
const navLinks = Array.from(document.querySelectorAll('.navbar__link'));
const sections = navLinks.map((link) => document.querySelector(link.hash));

// Shrink the navbar off the top of the page and highlight the section behind it.
function updateNavbar() {
    navbar.classList.toggle('navbar--shrunk', window.scrollY > 40);

    const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 2;
    let activeIndex = 0;
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= navbar.offsetHeight + 1) {
            activeIndex = index;
        }
    });
    if (atBottom) {
        activeIndex = sections.length - 1;
    }

    navLinks.forEach((link, index) => {
        link.classList.toggle('navbar__link--active', index === activeIndex);
    });
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(link.hash).scrollIntoView({ behavior: 'smooth' });
    });
});

const slides = Array.from(document.querySelectorAll('.carousel__slide'));
let slideIndex = 0;

// Reveal a single slide, wrapping around at either end.
function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
        slide.classList.toggle('carousel__slide--active', i === slideIndex);
    });
}

document.querySelector('.carousel__arrow--prev').addEventListener('click', () => showSlide(slideIndex - 1));
document.querySelector('.carousel__arrow--next').addEventListener('click', () => showSlide(slideIndex + 1));
showSlide(0);

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

document.querySelectorAll('.card__button').forEach((button) => {
    button.addEventListener('click', () => {
        modalTitle.textContent = button.dataset.title;
        modalBody.textContent = button.dataset.body;
        modal.classList.add('modal--open');
    });
});

// Close on the backdrop or the X button.
modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.classList.contains('modal__close')) {
        modal.classList.remove('modal--open');
    }
});
