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
	em.classList.toggle(icontheme === "bi.bi-sun-fill" ? "bi.bi-sun-fill" : "bi.bi-moon-fill");
});

function callCustomInput(e) {
	e.preventDefault();
	e.stopPropagation();
	default_input.click();
}

// for refactoring, use the object method on localStorage for later
// const themeChange = {
// 	light: {},
// };

// themeToggler.addEventListener("click", function (e) {
// 	e.stopPropagation();
// 	e.preventDefault();
// 	if (em.classList.contains("bi-moon-fill")) {
// 		em.classList.remove("bi-moon-fill");
// 		em.classList.add("bi-sun-fill");
// 		body.classList.remove("light");
// 		body.classList.add("dark");
// 		localStorage.setItem("theme", "dark");
// 		localStorage.setItem("icontheme", "bi-sun-fill");
// 	} else {
// 		em.classList.add("bi-moon-fill");
// 		em.classList.remove("bi-sun-fill");
// 		body.classList.remove("dark");
// 		body.classList.add("light");
// 		localStorage.setItem("theme", "light");
// 		localStorage.setItem("icontheme", "bi-moon-fill");
// 	}
// });

const _containerInner = document.querySelector("._container-inner");
const inputFile = document.getElementById("imageFile");

// main actions
inputFile.addEventListener("change", (e) => {
	// let imageValue = inputFile.value;
	let imageValue = e.target.files[0];
	// imageValue = imageValue.slice(12);
	apiCall(imageValue);
});

function apiCall(imageValue) {
	const apiKey = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

	const form = new FormData();
	form.append("image", imageValue);

	const encodedParams = new URLSearchParams();
	encodedParams.append("image", `${imageValue}`);

	const options = {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"X-RapidAPI-Key": `${apiKey}`,
			"X-RapidAPI-Host": "background-removal4.p.rapidapi.com",
		},
		body: encodedParams,
	};

	fetch("https://background-removal4.p.rapidapi.com/v1/results?mode=fg-image", options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
}

const buttonWrapper = document.createElement("div");
buttonWrapper.classList.add("_custom-button");
const button = document.createElement("button");
button.setAttribute("type", "button");
const text = document.createTextNode("Upload Image");
button.appendChild(text);

// function to add extra images
function addExtraImages() {
	button.addEventListener("click", callCustomInput);
}
addExtraImages();

// add an image if image is entered
function addExtraImagesd() {
	const _imageWrapper = document.createElement("div");
	_imageWrapper.classList.add("_image-wrapper");
}

// delete image wrapper if exist
function deleteImageWrapper() {
	const deleteImageWrapperBtn = document.querySelector(".tab-control button.close-result");
}

// create img tag for original Image
let OriginalImage = document.createElement("img");
OriginalImage.classList.add("img-fluid");
OriginalImage.setAttribute("src", "");

// create img tag for removed bg Image
let RemovedBgImage = document.createElement("img");
RemovedBgImage.classList.add("img-fluid");
RemovedBgImage.setAttribute("src", "");

const imageWrapper = `<section class="_image-wrapper">
						<div class="tab-control d-flex align-items-center justify-content-between">
							<ul class="nav nav-pills" id="pills-tab" role="tablist">
								<li class="nav-item" role="presentation">
									<button
										class="nav-link active"
										id="pills-original-image-tab"
										data-bs-toggle="pill"
										data-bs-target="#pills-original-image"
										type="button"
										role="tab"
										aria-controls="pills-original-image"
										aria-selected="true">
										Original Image
									</button>
								</li>
								<li class="nav-item" role="presentation">
									<button
										class="nav-link"
										id="pills-removed-bg-tab"
										data-bs-toggle="pill"
										data-bs-target="#pills-removed-bg"
										type="button"
										role="tab"
										aria-controls="pills-removed-bg"
										aria-selected="false">
										Removed Background
									</button>
								</li>
							</ul>
							<button class="close-result">
								<em>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										preserveAspectRatio="xMidYMid meet"
										viewBox="0 0 20 20">
										<path
											fill="currentColor"
											d="m3.219 2.154l6.778 6.773l6.706-6.705c.457-.407.93-.164 1.119.04a.777.777 0 0 1-.044 1.035l-6.707 6.704l6.707 6.702c.298.25.298.74.059 1.014c-.24.273-.68.431-1.095.107l-6.745-6.749l-6.753 6.752c-.296.265-.784.211-1.025-.052c-.242-.264-.334-.72-.025-1.042l6.729-6.732l-6.701-6.704c-.245-.27-.33-.764 0-1.075c.33-.311.822-.268.997-.068Z" />
									</svg>
								</em>
							</button>
						</div>
						<div class="tab-content my-5" id="pills-tabContent">
							<div
								class="tab-pane fade show active"
								id="pills-original-image"
								role="tabpanel"
								aria-labelledby="pills-original-image-tab"
								tabindex="0">
								<div class="image-container row col-12 m-0 align-items-center justify-content-evenly">
									<div class="image-wrapper col-md-7 p-0">
										<img src="./images/484120.jpg" alt="" class="img-fluid" />
									</div>
									<div class="image-content col-md-4">
										<div class="download-average">
											<a href="gotten image path" download>Download</a>
											<small>
												<span>Preview Size: 608 * 410</span>
											</small>
										</div>
									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="pills-removed-bg" role="tabpanel" aria-labelledby="pills-removed-bg-tab" tabindex="0">
								<div class="image-container row col-12 m-0 align-items-center justify-content-evenly">
									<div class="image-wrapper col-md-7 p-0">
										<img src="./images/484120.jpg" alt="" class="img-fluid" />
									</div>
									<div class="image-content col-md-4">
										<div class="download-average">
											<a href="gotten image path" download>Download</a>
											<small>
												<span>Preview Size: 608 * 410</span>
											</small>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>`;
