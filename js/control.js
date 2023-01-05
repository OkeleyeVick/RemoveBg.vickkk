const custom_button = document.querySelector("._custom-button button");
const default_input = document.querySelector("form input[type='file']");

// customInput with icon
custom_button.addEventListener("click", callCustomInput);

// call custom input
function callCustomInput(e) {
	e.stopPropagation();
	default_input.click();
}

const _containerInner = document.querySelector("._container-inner");
const inputFile = document.getElementById("imageFile");
const absoluteContainer = document.querySelector(".main-inner");

// main actions
inputFile.addEventListener("change", (e) => {
	let imageValue = e.target.files[0];
	apiCall(imageValue); // pass image to the api function
});

async function apiCall(imageValue) {
	let finalOriginalImage; //original image

	if (imageValue) {
		const imageFile = new FileReader();
		imageFile.addEventListener("load", function () {
			finalOriginalImage = imageFile.result;
		});
		imageFile.readAsDataURL(imageValue);

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
				// console.log(finalOriginalImage, image_url, request_id);
				// clean and empty the dom
				_containerInner.innerHTML = "";

				const imageTemplate = document.getElementById("image-template");
				const $imageTemplate = imageTemplate.content.cloneNode(true); //clone the tabs and pill template

				const realImageTabContent = $imageTemplate.querySelector("#pills-original-image");
				const rmvdImageTabContent = $imageTemplate.querySelector("#pills-removed-bg");

				// paste the original image to the image src attribute
				realImageTabContent.querySelector(".image-wrapper img.img-fluid").src = finalOriginalImage;

				//paste the bg-removed image to anchor tag href and img src attribute
				rmvdImageTabContent.querySelector(".bg-rmvd-image").href = image_url;
				rmvdImageTabContent.querySelector(".bg-rmvd-image img").src = image_url;

				// add tabs and pills to screen
				_containerInner.appendChild($imageTemplate); //paste final result to screen
			})
			.catch((err) => console.error(err));
	}
}
