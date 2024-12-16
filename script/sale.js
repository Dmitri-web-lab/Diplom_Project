let email = 'example@gmail.com'; // Проверочный email характеризующий пользователя
let addFavouritesProduct = "favourites"; // Ключ для избранных товаров

function convertGetLocalStorage(key) { // Функция для преобразования полученных данных из localStorage в объект
	let getOrdersArray = localStorage.getItem(key);
	let parseOrders = JSON.parse(getOrdersArray);
	return parseOrders;
}

function convertSetLocalStorage(key, data) { // Функция для преобразования объекта в строку для записи в localStorage
	let strokeArrayOrders = JSON.stringify(data);
	localStorage.setItem(key, strokeArrayOrders);
}


const cardContainer = document.querySelector('.discounted__cardContainer');
function createProductSaleSection() {
	dataSale.forEach(prod => {
		cardContainer.insertAdjacentHTML('beforeend', `
	<div class="discounted__card">
	<div class="discounted__photoProduct" id="${prod.id}"
	style="background-image: url(${prod.photoProduct}); width: ${prod.widthImage}px;">
	<div id="${prod.id}" class="discounted__photoProduct_favourites"></div>
</div>
<h4 class="discounted__cardTitle">${prod.description}</h4>
<p class="discounted__cardSubtitle">${prod.subtitle}</p>
<div class="discounted__cardArticul">Артикул: <b>${prod.article}</b></div>
<div class="discounted__priceWrupper">
	<div class="discounted__cardPrice">
		<div class="newPrice">${prod.price}</div>
		<img class="currency" src="./images/discounted_products/currencyColor.svg">
	</div>
	<div class="discounted__cardOldPrice">
		<div class="oldPrice">${prod.oldPrice}</div>
		<img src="./images/discounted_products/currencyGrey.svg" class="currencyGrey">
	</div>
</div>
<button id="${prod.id}" class="discounted__addBasket">ДОБАВИТЬ В КОРЗИНУ</button>
</div>
	`);
	});
}
createProductSaleSection();

// Создание объекта для добавления в общий массив данных из хранилища
let arrayAddProduct = []; // Массив на случай если корзина товаров пуста

function createObjectProduct(object) {
	let orderObject = {
		id: object.id,
		description: `${object.description}`,
		article: object.article,
		page: object.page,
		quantity: 1,
		price: object.price
	}

	if (localStorage.getItem(email)) { // Проверка на наличие ключа в хранилище

		let parseOrdersAvailale = convertGetLocalStorage(email); // Если ключ есть, то записываем в массив в хранилище
		parseOrdersAvailale.push(orderObject);
		convertSetLocalStorage(email, parseOrdersAvailale);
	} else {
		arrayAddProduct.push(orderObject); // Иначе создаем запись с ключом - email-ом и массивом, и добавляем товар в массив
		convertSetLocalStorage(email, arrayAddProduct);
	}
	
}

// Поиск товара по id в хранилище
function searchDataProduct(arrayObject, getAttrElementButton) {
	const product = arrayObject.find(function (item) {
		return item.id === getAttrElementButton;
	});
	if (product != undefined) {
		createObjectProduct(product);
	}
}

// Количество товара в корзине
function calculationQuantityProductBasket() {
	if (convertGetLocalStorage(email)) {
		let parseOrders = convertGetLocalStorage(email);
		document.querySelector('.head__userFunctions_countBuy').textContent = `${parseOrders.length}`;
	} else {
		document.querySelector('.head__userFunctions_countBuy').textContent = '0';

	}
}

// Кнопка добавления товара в корзину
const discountedAddBasket = document.querySelectorAll('.discounted__addBasket');
discountedAddBasket.forEach(selectedButton => {
	selectedButton.addEventListener('click', (event) => {
		let targetElementButton = event.target;
		let getAttrElementButton = Number(targetElementButton.getAttribute('id'));

		searchDataProduct(dataSale, getAttrElementButton); // Передаем в функцию массив с данными и id в функцию для записи товара в хранилище
		searchDataProduct(dataStock, getAttrElementButton); // аналогично строке - 317

		calculationQuantityProductBasket(); // Пересчитываем количество товара в корзине и выводим число на страницу
	})
})

calculationQuantityProductBasket(); // Аналогично строке 320 при загрузке страницы

// Функция для добавления товаров в избранное
const allButtonsFavourites = document.querySelectorAll('.discounted__photoProduct_favourites');
allButtonsFavourites.forEach(button => {
	button.addEventListener('click', (event) => {
		let arrayFavourites = [];
		let selectedElement = event.target;
		let elementID = Number(selectedElement.getAttribute('id'));
		let newObjectFavourites = {
			id: elementID,
			favouritesPage: "relationship"
		}
		if (!localStorage.getItem(addFavouritesProduct)) { // Проверяем если такого ключа нет, то создаем его и записываем массив с объектом
			arrayFavourites.push(newObjectFavourites);
		convertSetLocalStorage(addFavouritesProduct, arrayFavourites);
		} else { // А если есть такой ключ, то получаем массив, добавляем еще объект и записываем в хранилище
			let getArrayFavourites = convertGetLocalStorage(addFavouritesProduct);
			getArrayFavourites.push(newObjectFavourites);
		convertSetLocalStorage(addFavouritesProduct, getArrayFavourites);
		}



	})

})