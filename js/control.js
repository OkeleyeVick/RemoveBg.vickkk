const custom_button = document.querySelector("._custom-button button");
const body = document.body;
const default_input = document.querySelector("form input[type='file']");
const themeToggler = document.querySelector(".nav-theme-toggler .button-toggler");
const em = themeToggler.children.item("em");
const theme = localStorage.getItem("theme");
const icontheme = localStorage.getItem("icontheme");

window.addEventListener("load", function () {
	body.classList.toggle(theme === "dark" ? "dark" : "light");
	em.classList.toggle(icontheme === "bi.bi-sun-fill" ? "bi.bi-sun-fill" : "bi.bi-moon-fill");
});

// customInput with icon
custom_button.addEventListener("click", callCustomInput);

// call custom input
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
const absoluteContainer = document.querySelector(".main-inner");

// main actions
inputFile.addEventListener("change", (e) => {
	let imageValue = e.target.files[0];
	apiCall(imageValue);
});

// api call
async function apiCall(imageValue) {
	let finalOriginalImage; //original image

	if (imageValue) {
		const imageFile = new FileReader();
		imageFile.readAsDataURL(imageValue);
		imageFile.addEventListener("loadend", function () {
			finalOriginalImage = imageFile.result;
		});
	}

	const URL = "https://universal-background-removal.p.rapidapi.com/cutout/universal/common-image";
	const apiKey = "6473c3ce7dmsh28c8afd093343dep1d0f1fjsn02e8bc02b53a";

	const data = new FormData();
	data.append("image", imageValue);

	const options = {
		method: "POST",
		headers: {
			"X-RapidAPI-Key": `${apiKey}`,
			"X-RapidAPI-Host": "universal-background-removal.p.rapidapi.com",
		},
		body: data,
	};

	await fetch(URL, options)
		.then((response) => response.json())
		.then((response) => {
			const [image_url, request_id] = [response.data.image_url, response.request_id];
			console.log(response);
			pushToArrayAndDisplay(finalOriginalImage, image_url, request_id);
		})
		.catch((err) => console.error(err));
}

// array that takes in a list of templates
let templateArray = [];

// create button
const buttonWrapper = document.createElement("div");
buttonWrapper.classList.add("_custom-button");
const button = document.createElement("button");
button.setAttribute("type", "button");
const text = document.createTextNode("Upload Image");
button.appendChild(text);

// add new images to remove background image
button.addEventListener("click", callCustomInput);

// create a template to pass the original and bg-removed image to the array
function pushToArrayAndDisplay(finalOriginalImage, image_url, request_id) {
	const templateItem = {
		originalImage: `${finalOriginalImage}`,
		imageId: `${request_id}`,
		imageURL: `${image_url}`,
	};
	templateArray.push(templateItem);
	console.log(templateArray);
	// display content
	DisplayTemplates();
}

// default display
const defaultDisplay = `<h1>Upload an image to remove background</h1>
							<form action="" class="form-wrapper">
								<div class="mb-3">
									<input
										class="form-control"
										type="file"
										id="imageFile"
										accept="image/png, image/jpeg, image/jpg, *.jpeg, *.jpg, *.png" />
									<div class="_custom-button">
										<button type="button">
											<em>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													preserveAspectRatio="xMidYMid meet"
													viewBox="0 0 24 24">
													<g
														fill="none"
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2">
														<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7m4 2h6m-3-3v6" />
														<circle cx="9" cy="9" r="2" />
														<path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
													</g>
												</svg>
											</em>
											<span>Upload Image</span>
										</button>
									</div>
								</div>
							</form>`;

// function to display template
function addTemplatesToContent() {
	const templates = templateArray.map((eachTemplateItem) => {
		let templateContent;
		const { originalImage, imageId, imageURL } = eachTemplateItem;
		templateContent = `<section class="_image-wrapper" id=${imageId}>
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
											aria	-controls="pills-original-image"
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
									class="tab-pane fade "
									id="pills-original-image"
									role="tabpanel"
									aria-labelledby="pills-original-image-tab"
									tabindex="0">
									<div class="image-container row col-12 m-0 align-items-center justify-content-evenly">
										<div class="image-wrapper col-md-7 p-0">
											<!-- original image starts-->
											<a href="${originalImage}" class="img-fluid actual-image" download>
												<img src="${originalImage}" alt="Your image cannot be view" class="img-fluid"/>
											</a>
											<!-- original image ends-->
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
								<div class="tab-pane fade show active" id="pills-removed-bg" role="tabpanel" aria-labelledby="pills-removed-bg-tab" tabindex="0">
									<div class="image-container row col-12 m-0 align-items-center justify-content-evenly">
										<div class="image-wrapper col-md-7 p-0">
											<!-- bg-removed image starts-->
											<a href="${imageURL}" class="img-fluid actual-image" download="removeBg.vickkk-${originalImage}">
												<img src="${imageURL}" alt="Your image cannot be view" class="img-fluid"/>
											</a>
											<!-- bg-removed image ends-->
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
		return templateContent;
	});
	return templates;
}

// function to display templates
function DisplayTemplates() {
	const templatesResult = addTemplatesToContent();
	if (templateArray !== "") {
		const mainInner = document.querySelector(".main-inner .section-container");
		mainInner.appendChild(buttonWrapper);
		_containerInner.innerHTML += templatesResult;
		// _containerInner.appendChild(templatesResult);
	} else {
		_containerInner.innerHTML = defaultDisplay;
	}
}
// ? Dont Forget to call the immediate above function to display the contents in the array

const allDownloadButton = document.querySelectorAll(".download-button");
allDownloadButton.forEach((eachDownloadBtn) => {
	downloadImage(eachDownloadBtn);
});

// function to donwload any image or its button clicked
function downloadImage(element) {
	element.addEventListener("click", function (e) {
		e.stopPropagation();
		const imageLink = element.parentElement.parentElement.previousElementSibling.firstElementChild;
		imageLink.click();
	});
}

// todos
/* 
1. Add a preloader or use skeleton loader that displays when image is undergoing bg removing procedure
2. Work on the template button to close it or rather delete it if not needed
3. Work on the new button element at the top of all the templates
4. Fix the templates so that it tallies with the toggles of theme
5. use the object description about an element property in js to get the properties of the image, then give the width and height of the image
6. The download part of image, create a function for it - ✅done 
7. The striped white and black image should only show at the removed bg
*/
