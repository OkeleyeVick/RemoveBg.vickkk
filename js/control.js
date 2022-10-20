const custom_button = document.querySelector("._custom-button button");
const body = document.body;
const default_input = document.querySelector("form input[type='file']");
const themeToggler = document.querySelector(".nav-theme-toggler .button-toggler");
const em = themeToggler.children.item("em");
const theme = localStorage.getItem("theme");

custom_button.addEventListener("click", callCustomInput);

function callCustomInput(e) {
	e.preventDefault();
	e.stopPropagation();
	default_input.click();
}

themeToggler.addEventListener("click", function (e) {
	e.stopPropagation();
	e.preventDefault();
	if (em.classList.contains("bi-moon-fill")) {
		em.classList.remove("bi-moon-fill");
		em.classList.add("bi-sun-fill");
		body.classList.remove("light");
		body.classList.add("dark");
	} else {
		em.classList.add("bi-moon-fill");
		em.classList.remove("bi-sun-fill");
		body.classList.remove("dark");
		body.classList.add("light");
	}
});
