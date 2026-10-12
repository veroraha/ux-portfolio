// animated page header text

// The full title is written in the HTML so it still shows if this script is
// blocked, cached stale, or fails to load. The script clears it and retypes it.

var titleElement = document.querySelector("h1.page-header[id]");
var titleText = titleElement
	? (titleElement.dataset.title || titleElement.textContent.trim() || titleElement.id)
	: "";

// Iterate by Unicode code point so emoji aren't briefly split into surrogate halves.
var titleCharacters = Array.from(titleText);
var i = 0;
var speed = 120;

function typewriter() {
	if (titleElement === null) {
		return;
	}
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}
	if (i === 0) {
		titleElement.setAttribute("aria-label", titleText);
		titleElement.textContent = "";
	}
	if (i < titleCharacters.length) {
		titleElement.textContent += titleCharacters[i];
		i++;
		setTimeout(typewriter, speed);
	} else {
		titleElement.removeAttribute("aria-label");
	}
}

// Mobile navigation and page active state handling
function setupNavigation() {
	const menuToggle = document.getElementById('menuToggle');
	const dropdownLinks = document.getElementById('dropdownLinks');
	const nav = menuToggle ? menuToggle.closest('.nav') : null;

	const setMenuOpen = (open) => {
		if (!nav || !menuToggle) {
			return;
		}
		nav.classList.toggle('is-open', open);
		menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	};

	if (menuToggle && dropdownLinks && nav) {
		menuToggle.addEventListener('click', (e) => {
			e.stopPropagation();
			setMenuOpen(!nav.classList.contains('is-open'));
		});

		document.addEventListener('click', (e) => {
			if (!nav.contains(e.target)) {
				setMenuOpen(false);
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && nav.classList.contains('is-open')) {
				setMenuOpen(false);
				menuToggle.focus();
			}
		});

		dropdownLinks.addEventListener('click', (e) => {
			if (e.target.closest('a')) {
				setMenuOpen(false);
			}
		});
	}

	// Hide the sticky header on downward scroll and reveal it on upward scroll.
	const siteHeader = document.querySelector('.site-header');
	if (siteHeader) {
		let previousScrollY = window.scrollY;
		let scrollTicking = false;

		const updateHeaderOnScroll = () => {
			const currentScrollY = window.scrollY;
			const menuIsOpen = nav && nav.classList.contains('is-open');

			if (menuIsOpen || currentScrollY <= 0) {
				siteHeader.classList.remove('header-hidden');
			} else if (currentScrollY > previousScrollY) {
				siteHeader.classList.add('header-hidden');
			} else if (currentScrollY < previousScrollY) {
				siteHeader.classList.remove('header-hidden');
			}

			previousScrollY = currentScrollY;
			scrollTicking = false;
		};

		window.addEventListener('scroll', () => {
			if (!scrollTicking) {
				window.requestAnimationFrame(updateHeaderOnScroll);
				scrollTicking = true;
			}
		}, { passive: true });
	}

	// Active link highlight based on current path
	// URLs are extensionless (/about); normalise so /about, /about.html, and
	// /about/ all count as the same page, with / and index collapsing to "".
	const normalise = (path) => path
		.replace(/\.html$/, '')
		.replace(/\/+$/, '')
		.replace(/^\/?index$/, '')
		.replace(/^\/+/, '');
	const currentPath = normalise(window.location.pathname);
	const navLinks = document.querySelectorAll('.header-links a, .dropdown-links a');

	navLinks.forEach(link => {
		const href = link.getAttribute('href') || '';
		if (/^(https?:)?\/\//.test(href) || href.startsWith('mailto:')) {
			return;
		}
		if (normalise(href) === currentPath) {
			link.classList.add('active');
		}
	});

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	// Smooth subtle image entrance animations
	const cards = document.querySelectorAll('.headshot');
	cards.forEach((card, index) => {
		card.style.opacity = '0';
		card.style.transform = 'translateY(15px)';
		card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
		
		setTimeout(() => {
			card.style.opacity = '1';
			card.style.transform = 'translateY(0)';
		}, 50);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	setupNavigation();

	// Let the cursor blink for one second before the greeting begins typing.
	if (titleElement && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		const homeIntro = titleElement.closest('.home-intro');
		if (homeIntro) {
			requestAnimationFrame(() => homeIntro.classList.add('home-intro-entered'));
		}
		// Keep the greeting and emoji hidden while the cursor blinks.
		if (homeIntro) {
			titleElement.classList.remove('typing-started');
		}
		setTimeout(() => {
			if (homeIntro) {
				titleElement.classList.add('typing-started');
			}
			typewriter();
		}, 1000);
	} else {
		typewriter();
	}
});
