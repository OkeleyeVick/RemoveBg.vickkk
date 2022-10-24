const arrayElement = [];

const container = document.querySelector(".container");

for (let b = 1; b < 7; b++) {
	arrayElement.push({ id: `${b}` });
}

let template;
arrayElement.map((item) => {
	template = `<div id="${item.id}" class="box">
						<button type="button"  class="close" onclick="handleDelete(${item.id})">x</button>
						<h2>${item.id}</h2>
						</div>`;
	console.log(template);
	return template;
});

function handleDelete(itemId) {
	console.log(itemId);
	arrayElement.filter((arrayItem) => arrayItem.id !== itemId);
}
