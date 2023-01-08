const custom_button = document.querySelector("._custom-button button");
const default_input = document.querySelector("form input[type='file']");

// call custom input
function callCustomInput(e) {
	e.stopPropagation();
	default_input.click();
}
// customInput with icon
custom_button.addEventListener("click", callCustomInput);

const _containerInner = document.querySelector("._container-inner");
const inputFile = document.getElementById("imageFile");
const absoluteContainer = document.querySelector(".main-inner .container");

inputFile.addEventListener("change", (e) => {
	let imageValue = e.target.files[0];
	const fileName = imageValue.name;
	apiCall(imageValue, fileName, imageSource); // pass image to the api function
});

async function apiCall(imageValue, fileName) {
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
			.then((response) => {
				if (!response.ok) throw "Unexpected error occurred, try again. If this keeps happening, try again later. Thank you";
				return response.json();
			})
			.then((response) => {
				const [image_url, request_id] = [response.data.image_url, response.request_id];
				// clean and empty the dom
				_containerInner.innerHTML = "";

				const imageTemplate = document.getElementById("image-template");
				const $imageTemplate = imageTemplate.content.cloneNode(true); //clone the tabs and pill template

				const realImageTabContent = $imageTemplate.querySelector("#pills-original-image");
				const rmvdImageTabContent = $imageTemplate.querySelector("#pills-removed-bg");

				// paste the original image to the image src attribute
				realImageTabContent.querySelector(".image-wrapper img.img-fluid").src = finalOriginalImage;

				//paste the bg-removed image to anchor tag href and img src attribute
				rmvdImageTabContent.querySelector("#pills-removed-bg a.download-button").href = `${image_url}`;
				rmvdImageTabContent.querySelector(".bg-rmvd-image").href = image_url;
				rmvdImageTabContent.querySelector(".bg-rmvd-image img").src = image_url;
				rmvdImageTabContent.querySelector(".bg-rmvd-image").download = `removebg-vickkk-${fileName}`;

				// add tabs and pills to screen
				_containerInner.appendChild($imageTemplate); //paste final result to screen

				const defaultView = document.getElementById("default");
				const $clonedDefault = defaultView.content.cloneNode(true);
				const section = document.querySelector("._image-wrapper");
				const deleteIcon = document.querySelector("._image-wrapper button.close-result");
				deleteIcon.addEventListener("click", (e) => {
					e.stopPropagation();
					_containerInner.innerHTML = "";
					_containerInner.appendChild($clonedDefault);
				});
			})
			.catch((error) => {
				_containerInner.innerHTML = "";
				const img = document.createElement("img"); //create img tag
				img.className = "img-fluid";
				img.style = "max-width: 300px";
				img.setAttribute("alt", "");
				img.src = image[0].src ?? image[1].src;

				const h4 = document.createElement("h4");
				const text = document.createTextNode(error);
				h4.appendChild(text);

				_containerInner.appendChild(img);
				_containerInner.appendChild(h4);
			});
	}
}

const image = [
	{
		src: "./../images/errorpage-vg.svg",
	},
	{
		src: "./../images/errorpage.png",
	},
];

// left to do
// 1. Default view when you clear the template =>  works but button isn't working
// 2. the download button so that the image can download
