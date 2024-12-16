const favouritesCardContainer = document.querySelector('.favourites__cardContainer');

let email = 'example@gmail.com'; // Проверочный email характеризующий пользователя
let addFavouritesProduct = "favourites"; // Ключ для избранных товаров


// Количество товара в корзине
function calculationQuantityProductBasket() {
	let parseOrders = convertGetLocalStorage(email);
	document.querySelector('.head__userFunctions_countBuy').textContent = `${parseOrders.length}`;
}
calculationQuantityProductBasket(); // Пересчитываем количество товара в корзине и выводим число на страницу

function convertGetLocalStorage(key) { // Функция для преобразования полученных данных из localStorage в объект
	let getOrdersArray = localStorage.getItem(key);
	let parseOrders = JSON.parse(getOrdersArray);
	return parseOrders;
}

function convertSetLocalStorage(key, data) { // Функция для преобразования объекта в строку для записи в localStorage
	let strokeArrayOrders = JSON.stringify(data);
	localStorage.setItem(key, strokeArrayOrders);
}
// Проверка на пустой блок. Активен, если нет избранных товаров
const ordersDefaultOrderBlock = document.querySelector('.orders__defaultOrderBlock');

function exampleOrdersDefault() {
	let parseOrders = convertGetLocalStorage(addFavouritesProduct);

	if (parseOrders.length == 0) {
		ordersDefaultOrderBlock.style.display = `flex`;
	} else {
		ordersDefaultOrderBlock.style.display = `none`;
	}
}
exampleOrdersDefault();

// Ищем по базам необходимый элемент по id и создаем избранную карточку
function searchCardData(elem, data) {
	data.forEach(examElem => {
		if (examElem.id == elem && examElem.relationship == "sale") {
			favouritesCardContainer.insertAdjacentHTML('beforeend', `
			<div class="discounted__card" id="${examElem.id}">
			<div class="discounted__photoProduct" id="${examElem.id}"
			style="background-image: url(${examElem.photoProduct}); width: ${examElem.widthImage}px;">
			<div id="${examElem.id}" class="discounted__photoProduct_favouritesPage"></div>
		</div>
		<h4 class="discounted__cardTitle">${examElem.description}</h4>
		<p class="discounted__cardSubtitle">${examElem.subtitle}</p>
		<div class="discounted__cardArticul">Артикул: <b>${examElem.article}</b></div>
		<div class="discounted__priceWrupper">
			<div class="discounted__cardPrice">
				<div class="newPrice">${examElem.price}</div>
				<img class="currency" src="./images/discounted_products/currencyColor.svg">
			</div>
			<div class="discounted__cardOldPrice">
				<div class="oldPrice">${examElem.oldPrice}</div>
				<img src="./images/discounted_products/currencyGrey.svg" class="currencyGrey">
			</div>
		</div>
		<button id="${examElem.id}" class="discounted__addBasket">ДОБАВИТЬ В КОРЗИНУ</button>
		</div>
			`);
		} else if (examElem.id == elem && examElem.relationship == "stock") {
			favouritesCardContainer.insertAdjacentHTML('beforeend', `
	<div class="discounted__card" id="${examElem.id}">
	<div class="discounted__photoProduct" id="${examElem.id}"
	style="background-image: url(${examElem.photoProduct}); width: ${examElem.widthImage}px;">
	<div id="${examElem.id}" class="discounted__photoProduct_favouritesPage"></div>
	<div class="discounted__photoProduct_stock">-${examElem.stock}%</div>
</div>
<h4 class="discounted__cardTitle">${examElem.description}</h4>
<p class="discounted__cardSubtitle">${examElem.subtitle}</p>
<div class="discounted__cardArticul">Артикул: <b>${examElem.article}</b></div>
<div class="discounted__priceWrupper">
	<div class="discounted__cardPrice">
		<div class="newPrice">${examElem.price}</div>
		<img class="currency" src="./images/discounted_products/currencyColor.svg">
	</div>
	<div class="discounted__cardOldPrice">
		<div class="oldPrice">${examElem.oldPrice}</div>
		<img src="./images/discounted_products/currencyGrey.svg" class="currencyGrey">
	</div>
</div>
<button id="${examElem.id}" class="discounted__addBasket">ДОБАВИТЬ В КОРЗИНУ</button>
</div>
	`);
		}
	})
}

// Перебираем элементы и передаем id элемента в функцию для создания карточки
let parseFavourites = convertGetLocalStorage(addFavouritesProduct);
parseFavourites.forEach(elem => {
	let elemID = elem.id;
	searchCardData(elemID, dataSale)
	searchCardData(elemID, dataStock)
})

// Кнопка удаления избранных товаров со страницы - избранное
const discountedPhotoProductFavouritesPage = document.querySelectorAll('.discounted__photoProduct_favouritesPage');
const discountedCard = document.querySelectorAll('.discounted__card');

discountedPhotoProductFavouritesPage.forEach(button => {
	button.addEventListener('click', (event) => {
		let selectedButton = event.target;
		let getAttributeButton = Number(selectedButton.getAttribute('id'));
		parseFavourites.forEach(elem => {
			if (elem.id == getAttributeButton) {
				let indexDataElement = parseFavourites.indexOf(elem);
				parseFavourites.splice(indexDataElement, 1);
					let stringArrayNewData = JSON.stringify(parseFavourites);
					localStorage.setItem(addFavouritesProduct, stringArrayNewData);
			}
		})
		discountedCard.forEach(card => {
			let getCardAttribute = Number(card.getAttribute('id'));
			if (getCardAttribute == getAttributeButton) {
				card.remove();

			}
		})
	})
})