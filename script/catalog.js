const addBasketCatalogPage = document.querySelector('#addBasketCatalogPage');
const orderDescription = document.querySelector('#orderDescription');
const orderArticle = document.querySelector('#orderArticle');
const orderPage = document.querySelector('#orderPage');
const orderQuantity = document.querySelector('#orderQuantity');

let arrayOrders = [];
let uniqueID = 0;
let email = 'example@gmail.com'

function convertGetLocalStorage() { // Функция для преобразования полученных данных из localStorage в объект
	let getOrdersArray = localStorage.getItem(email);
	let parseOrders = JSON.parse(getOrdersArray);
	return parseOrders;
}

function convertSetLocalStorage(data) { // Функция для преобразования объекта в строку для записи в localStorage
	let strokeArrayOrders = JSON.stringify(data);
	localStorage.setItem(email, strokeArrayOrders);
}

const headUserFunctionsCountBuy = document.querySelector('.head__userFunctions_countBuy');

function addCountBuy() { // Функция подсчета прибавления количества товара в корзине 
	if (localStorage.getItem(email)) {
		let parseOrders = convertGetLocalStorage();
		headUserFunctionsCountBuy.textContent = `${parseOrders.length}`;
	}
}
addCountBuy();

function animationLiningButton() { // Функция анимации кнопки
	const liningButton = document.querySelector('.catalog__form_lining');
	liningButton.classList.toggle('catalog__form_liningAnimation');
	addBasketCatalogPage.textContent = 'ЗАКАЗ ДОБАВЛЕН';

	setTimeout(() => {
		liningButton.classList.toggle('catalog__form_liningAnimation');
		addBasketCatalogPage.textContent = 'ДОБАВИТЬ В КОРЗИНУ';
	}, 1000);
}

let addPriceData;
// Кнопка для добавления заказа в корзину
addBasketCatalogPage.addEventListener('click', function () {
	if (localStorage.getItem(email)) {
		let parseOrders = convertGetLocalStorage();
		uniqueID = parseOrders.length + 1
	} else {
		uniqueID++;
	}

	costOrder.forEach(dataPrice => {
		if (dataPrice.article == orderArticle.value) {
			addPriceData = dataPrice.price;
		}
	})
	let orderObject = {
		id: uniqueID,
		description: `${orderDescription.value}`,
		article: `${orderArticle.value}`,
		page: `${orderPage.value}`,
		quantity: `${orderQuantity.value}`,
		price: addPriceData
	}

	if (localStorage.getItem(email)) {

		let parseOrdersAvailale = convertGetLocalStorage();
		parseOrdersAvailale.push(orderObject)
		convertSetLocalStorage(parseOrdersAvailale)
	} else {
		arrayOrders.push(orderObject);
		convertSetLocalStorage(arrayOrders)
	}

	addCountBuy();
	animationLiningButton();

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