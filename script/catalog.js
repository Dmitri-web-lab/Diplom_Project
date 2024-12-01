const addBasketCatalogPage = document.querySelector('#addBasketCatalogPage');
const orderDescription = document.querySelector('#orderDescription');
const orderArticle = document.querySelector('#orderArticle');
const orderPage = document.querySelector('#orderPage');
const orderQuantity = document.querySelector('#orderQuantity');

let arrayOrders = [];
let uniqueID = 0;
let email = 'example@gmail.com'

const headUserFunctionsCountBuy = document.querySelector('.head__userFunctions_countBuy');

function addCountBuy() {
	if (localStorage.getItem(email)) {
		let getOrdersArray = localStorage.getItem(email);
		let parseOrders = JSON.parse(getOrdersArray);
		headUserFunctionsCountBuy.textContent = `${parseOrders.length}`;
	}
}
addCountBuy();

addBasketCatalogPage.addEventListener('click', function () {
	uniqueID++;
	let orderObject = {
		id: uniqueID,
		description: `${orderDescription.value}`,
		article: `${orderArticle.value}`,
		page: `${orderPage.value}`,
		quantity: `${orderQuantity.value}`
	}
	arrayOrders.push(orderObject);
	console.log(arrayOrders);

	let strokeArrayOrders = JSON.stringify(arrayOrders);
	localStorage.setItem(email, strokeArrayOrders);

	addCountBuy();
});

// Для адаптива, меняет количество строк в теге textarea с 10 на 2
if (window.innerWidth <= 1230) {
	orderDescription.setAttribute('rows', "1");
}

// Кнопка закрытия формы для отправки
const catalogFormOrderButtonClose = document.querySelector('.catalog__form_orderButtonClose');
const catalogForm = document.querySelector('.catalog__form');
const catalogFormDivElements = catalogForm.querySelectorAll('div');
const catalogFormOrderButton = document.querySelector('.catalog__form_orderButton');

function openCheckoutblock() {
	catalogFormDivElements.forEach(block => {
		block.style.display = `block`;
	});
	catalogFormOrderButton.style.display = `block`;
	catalogFormOrderButtonClose.classList.remove('catalog__form_orderButtonCloseActive');
	catalogFormOrderButtonClose.classList.add('catalog__form_orderButtonClose');
	catalogFormOrderButtonClose.textContent = "X";
	catalogForm.style.cssText = `border: 1px dashed $colorSelectSite;`;
	catalogFormOrderButtonClose.removeEventListener('click', openCheckoutblock);
	catalogFormOrderButtonClose.addEventListener('click', closingCheckoutblock);
}

function closingCheckoutblock() {
	catalogFormDivElements.forEach(block => {
		block.style.display = `none`;
	});
	catalogFormOrderButton.style.display = `none`;
	catalogFormOrderButtonClose.classList.add('catalog__form_orderButtonCloseActive');
	catalogFormOrderButtonClose.classList.remove('catalog__form_orderButtonClose');
	catalogFormOrderButtonClose.textContent = "";
	catalogForm.style.border = `none`;
	catalogFormOrderButtonClose.removeEventListener('click', closingCheckoutblock);
	catalogFormOrderButtonClose.addEventListener('click', openCheckoutblock);
}

catalogFormOrderButtonClose.addEventListener('click', closingCheckoutblock);