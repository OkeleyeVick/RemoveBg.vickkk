const custom_button = document.querySelector("._custom-button button");
const body = document.body;
const default_input = document.querySelector("form input[type='file']");
const themeToggler = document.querySelector(".nav-theme-toggler .button-toggler");

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
	const em = themeToggler.children.item("em");
	if (em.classList.contains("bi-moon-fill")) {
		em.classList.remove("bi-moon-fill");
		em.classList.add("bi-sun-fill");
		body.classList.add("dark");
		// function to set the Theme in storage
	} else {
		em.classList.add("bi-moon-fill");
		em.classList.remove("bi-sun-fill");
		body.classList.remove("dark");
	}
}
