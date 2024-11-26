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
	let getOrdersArray = localStorage.getItem(email);
	let parseOrders = JSON.parse(getOrdersArray);
	headUserFunctionsCountBuy.textContent = `${parseOrders.length}`;
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
