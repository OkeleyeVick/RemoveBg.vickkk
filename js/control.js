const custom_button = document.querySelector("._custom-button button");
const body = document.body;
const default_input = document.querySelector("form input[type='file']");
const themeToggler = document.querySelector(".nav-theme-toggler .button-toggler");
const em = themeToggler.children.item("em");

window.addEventListener("load", function () {
	checkTheme();

	custom_button.addEventListener("click", callCustomInput);
	themeToggler.addEventListener("click", ToggleTheme);

	// function to toggle call the custom input
	function callCustomInput(e) {
		e.preventDefault();
		e.stopPropagation();
		default_input.click();
	}

	// function to light/dark mode
	function ToggleTheme(e) {
		e.stopPropagation();
		if (em.classList.contains("bi-moon-fill")) {
			em.classList.remove("bi-moon-fill");
			em.classList.add("bi-sun-fill");
			localStorage.setItem("theme", "dark");
		} else {
			em.classList.add("bi-moon-fill");
			em.classList.remove("bi-sun-fill");
			localStorage.setItem("theme", "light");
		}
	}

	// check if there is a theme
	function checkTheme() {
		const themeFromStorage = localStorage.getItem("theme");

		if (themeFromStorage !== null && themeFromStorage) {
			body.classList.add(localStorage.getItem("theme"));
		}
	}
});
