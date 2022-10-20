const custom_button = document.querySelector("._custom-button button");
const body = document.body;
const default_input = document.querySelector("form input[type='file']");
const themeToggler = document.querySelector(".nav-theme-toggler .button-toggler");
const em = themeToggler.children.item("em");
const theme = localStorage.getItem("theme");
const icontheme = localStorage.getItem("icontheme");

custom_button.addEventListener("click", callCustomInput);
window.addEventListener("load", function () {
	body.classList.toggle(theme === "dark" ? "dark" : "light");
	em.classList.toggle(icontheme === "bi-sun-fill" ? "bi-sun-fill" : "bi-moon-fill");
});

function callCustomInput(e) {
	e.preventDefault();
	e.stopPropagation();
	default_input.click();
}

// for refactoring, use the object method on localStorage
// const themeChange = {
// 	light: {},
// };

themeToggler.addEventListener("click", function (e) {
	e.stopPropagation();
	e.preventDefault();
	if (em.classList.contains("bi-moon-fill")) {
		em.classList.remove("bi-moon-fill");
		em.classList.add("bi-sun-fill");
		body.classList.remove("light");
		body.classList.add("dark");
		localStorage.setItem("theme", "dark");
		localStorage.setItem("icontheme", "bi-sun-fill");
	} else {
		em.classList.add("bi-moon-fill");
		em.classList.remove("bi-sun-fill");
		body.classList.remove("dark");
		body.classList.add("light");
		localStorage.setItem("theme", "light");
		localStorage.setItem("icontheme", "bi-moon-fill");
	}
});
