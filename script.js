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
	const currentPath = window.location.pathname.split('/').pop() || 'index.html';
	const navLinks = document.querySelectorAll('.header-links a, .dropdown-links a');

	navLinks.forEach(link => {
		const href = link.getAttribute('href');
		if (
			href === currentPath || 
			(currentPath === '' && href === 'index.html') ||
			(currentPath === 'home.html' && (href === 'home.html' || href === 'index.html'))
		) {
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

document.addEventListener('DOMContentLoaded', () => {
	setupNavigation();
	typewriter();
});
