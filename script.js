// animated page header text

// The full title is written in the HTML so it still shows if this script is
// blocked, cached stale, or fails to load. The script clears it and retypes it.

var titleElement = document.querySelector("h1.page-header[id]");
var titleText = titleElement
	? (titleElement.dataset.title || titleElement.textContent.trim() || titleElement.id)
	: "";

var i = 0;
var speed = 120;

function typewriter() {
	if (titleElement === null) {
		return;
	}
	if (i === 0) {
		titleElement.setAttribute("aria-label", titleText);
		titleElement.textContent = "";
	}
	if (i < titleText.length) {
		titleElement.textContent += titleText.charAt(i);
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

	if (menuToggle && dropdownLinks) {
		menuToggle.addEventListener('click', (e) => {
			e.stopPropagation();
			menuToggle.classList.toggle('open');
		});

		document.addEventListener('click', (e) => {
			if (!menuToggle.contains(e.target)) {
				menuToggle.classList.remove('open');
			}
		});
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

	// Smooth subtle image entrance animations
	const cards = document.querySelectorAll('.project, .headshot, .home-page');
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

// Projects page gallery carousel
function setupGallery() {
	const gallery = document.getElementById('projectGallery');
	if (!gallery) {
		return;
	}

	const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
	const dots = Array.from(gallery.querySelectorAll('[data-gallery-to]'));
	const prevBtn = gallery.querySelector('[data-gallery-prev]');
	const nextBtn = gallery.querySelector('[data-gallery-next]');
	if (slides.length < 2) {
		return;
	}

	let current = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));

	function show(index, direction) {
		const next = (index + slides.length) % slides.length;
		if (next === current) {
			return;
		}

		const leaving = slides[current];
		const entering = slides[next];

		leaving.classList.remove('is-active', 'is-exit-left', 'is-exit-right');
		leaving.classList.add(direction > 0 ? 'is-exit-left' : 'is-exit-right');
		leaving.setAttribute('aria-hidden', 'true');
		leaving.setAttribute('tabindex', '-1');

		entering.classList.remove('is-exit-left', 'is-exit-right');
		entering.classList.add(direction > 0 ? 'is-exit-right' : 'is-exit-left');
		// Force a style flush so the entering slide animates in from its offset.
		void entering.offsetWidth;
		entering.classList.remove('is-exit-left', 'is-exit-right');
		entering.classList.add('is-active');
		entering.removeAttribute('aria-hidden');
		entering.removeAttribute('tabindex');

		dots.forEach((dot, i) => {
			const active = i === next;
			dot.classList.toggle('is-active', active);
			dot.setAttribute('aria-selected', active ? 'true' : 'false');
		});

		current = next;
	}

	if (prevBtn) {
		prevBtn.addEventListener('click', () => show(current - 1, -1));
	}
	if (nextBtn) {
		nextBtn.addEventListener('click', () => show(current + 1, 1));
	}
	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			const target = Number(dot.dataset.galleryTo);
			show(target, target > current ? 1 : -1);
		});
	});

	gallery.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			show(current - 1, -1);
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			show(current + 1, 1);
		}
	});

	// Swipe on touch devices
	let touchStartX = null;
	gallery.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].clientX;
	}, { passive: true });
	gallery.addEventListener('touchend', (e) => {
		if (touchStartX === null) {
			return;
		}
		const delta = e.changedTouches[0].clientX - touchStartX;
		touchStartX = null;
		if (Math.abs(delta) > 50) {
			show(delta < 0 ? current + 1 : current - 1, delta < 0 ? 1 : -1);
		}
	}, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
	setupNavigation();
	typewriter();
	setupGallery();
});
