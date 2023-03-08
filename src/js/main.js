import '../css/style.css';

let apiUrl = 'https://api.openbrewerydb.org/breweries?per_page=50';
let breweriesData = [];
let pageSize = 15;
let currentPage = 1;

async function renderData() {
	await getData();

	// create html  data
	let breweries = '';

	breweriesData
		.filter((row, index) => {
			let start = (currentPage - 1) * pageSize;
			let end = currentPage * pageSize;

			if (index >= start && index < end) return true;
		})
		.forEach((item) => {
			breweries +=
				'<div class="flex flex-col gap-5 p-8 h-auto w-1/2 border-cyan-700 border-2 rounded">';
			breweries += `<h2 class="text-2xl font-bold float-left">${item.name}</h2>
			<p>City: ${item.city}</p>
			<p>State: ${item.state}</p>
					<button class="text-blue-600 font-semibold self-end float-right voir-plus" brew-id=${item.id}>
						en savoir plus
					</button></div>`;
		});
	document.getElementById('app').innerHTML = breweries;
}

renderData();

async function getData() {
	const response = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});
	const breweries = await response.json();
	breweriesData = breweries;
}

// //   ********** pagination locig start
function previousPage() {
	if (currentPage > 1) {
		currentPage--;
		renderData();
	}
}

function nextPage() {
	if (currentPage * pageSize < breweriesData.length) {
		currentPage++;
		renderData();
	}
}

document
	.querySelector('#prevButton')
	.addEventListener('click', previousPage, false);
document
	.querySelector('#nextButton')
	.addEventListener('click', nextPage, false);

//pagination logic end

/// ********************->search bar logic<-*********************************
const search = document.getElementById('searchField');
const matchList = document.getElementById('app');

const searchState = async (searchText) => {
	const res = await fetch(apiUrl);
	const states = await res.json();

	let matches = states.filter((state) => {
		const regex = new RegExp(`(${searchText})`, 'gi');
		return state.name.match(regex);
	});
	if (searchText.length === 0) {
		matches = [];
	}
	outputHtml(matches);
};

//show results in html

const outputHtml = (matches) => {
	if (matches.length > 0) {
		const html = matches
			.map(
				(match) => `
		<div class="flex flex-col gap-5 p-8 h-auto w-1/2 border-cyan-700 border-2 rounded">
			<h2 class="text-2xl font-bold float-left">${match.name}</h2>
				<p>City: ${match.city}</p>
			<p>State: ${match.state}</p>
		<button class="text-blue-600 font-semibold self-end float-right voir-plus" brew-id=${match.id}>
						en savoir plus
					</button></div>
		</div>
		`
			)
			.join('');

		matchList.innerHTML = html;
	}
};

search.addEventListener('input', () => searchState(search.value));
//// ******************->end search bar logic<-***********************************

// 		outputDiv.innerHTML += out;
// 	});
// 	window.addEventListener('load', () => {
// 		const overlay = document.querySelector('#overlay');
// 		const close_btn = document.querySelector('#close-btn');
// 		const close_icon = document.querySelector('#close-icon');
// 		const seeMore = document.getElementsByClassName('voir-plus');

// 		const toggleModal = () => {
// 			overlay.classList.toggle('hidden');
// 			overlay.classList.toggle('flex');
// 		};
// 		for (let seeMoreItem of seeMore) {
// 			seeMoreItem.addEventListener('click', toggleModal);
// 		}
// 		close_icon.addEventListener('click', toggleModal);
// 		close_btn.addEventListener('click', toggleModal);
// 	});
// }

// //rendering data
// renderData();

///
