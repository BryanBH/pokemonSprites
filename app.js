const container = document.querySelector(".pkContainer");
const baseURL =
	"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const generations = {
	1: { id: "firstGen", name: "First Generation", start: 1, end: 151 },
	2: { id: "secondGen", name: "Second Generation", start: 152, end: 251 },
	3: { id: "thirdGen", name: "Third Generation", start: 252, end: 386 },
	4: { id: "fourthGen", name: "Fourth Generation", start: 387, end: 493 },
	5: { id: "fifthGen", name: "Fifth Generation", start: 494, end: 649 },
	6: { id: "sixthGen", name: "Sixth Generation", start: 650, end: 721 },
	7: { id: "seventhGen", name: "Seventh Generation", start: 722, end: 809 },
	8: { id: "eigthGen", name: "Eighth Generation", start: 810, end: 898 },
};

const numGenerations = Object.keys(generations).length;
// iterate through gens
for (let i = 1; i <= numGenerations; i++) {
	let name = generations[i].name;
	let id = generations[i].id;

	// generate div container
	const genContainer = document.createElement("div");
	genContainer.classList.add("gen-container", "toggle-content");
	genContainer.id = id;

	// anchor tag
	const anchor = document.createElement("a");
	anchor.href = "#" + id;
	anchor.append(name);
	anchor.classList.add("toggle");

	// arrow
	const span = document.createElement("span");
	span.append(" ➤ ");

	// gen title embedded anchor and span
	const h2 = document.createElement("h2");
	h2.classList.add("gen-title");

	h2.insertAdjacentElement("beforeend", span);
	h2.insertAdjacentElement("beforeend", anchor);

	// append gen container inside gen title
	h2.appendChild(genContainer);

	container.appendChild(h2);

	let start = generations[i].start;
    let end = generations[i].end;

	// function call to generate pokemon
	generatePokemon(start, end, h2, genContainer);
}

/**
 * Generate pokemon and insert them to page inside 'pokmon container'
 * @param {number} start
 * @param {number} end
 * @param {h2} h2
 * @param {div} genContainer
 */
function generatePokemon(start, end, h2, genContainer) {
	// throw error if start and end aren't in range
	if (start < 1 && end > 900) {
		throw console.error("start and end must be between 1-900");
	} else {
		// iterate and create pokemon
		for (let i = start; i <= end; i++) {
			const pokemon = document.createElement("div");
			pokemon.classList.add("pokemon");
			const label = document.createElement("p");
			label.innerHTML = `<b>#${i}</b>`;
			label.classList.add("pokemon-label");
			const pokemonImg = document.createElement("img");
			pokemonImg.classList.add("pokemonImg");
			pokemonImg.src = `${baseURL}${i}.png`;

			// Append image and label to div
			pokemon.appendChild(pokemonImg);
			pokemon.appendChild(label);

			// Append pokemon to container and h2 element
			genContainer.appendChild(pokemon);
			h2.appendChild(genContainer);
		}
	}
}
//  Page control functions
let show = function (element) {
	element.style.display = "block";
};

let hide = function (element) {
	element.style.display = "none";
};

let toggle = function(element) {
	const parent = element.parentElement;

	// if eleemnt is shown, hide it
	if (window.getComputedStyle(element).display === "block") {
		hide(element);
		parent.classList.remove("opened");
		return;
	}
    //show it 
	show(element);
	parent.classList.add("opened");
}

document.addEventListener(
	"click",
    function (event) {
		// get the target
		const target = event.target;
		if (!target.classList.contains("toggle")) {
			return;
        }
        
        //prevent default link behavior
		event.preventDefault();

		// Get the content
		let content = document.querySelector(event.target.hash);
		if (!content) return;

		// Toggle the content
		toggle(content);
	},
	false
);

const genElements = document.querySelectorAll(".gen-container");
for (let ele of genElements) {
	hide(ele);
}
