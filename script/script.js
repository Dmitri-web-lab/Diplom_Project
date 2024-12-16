const rootStyle = document.querySelector(':root');
const navMenuBtnClose = document.querySelector('.head__nav-menu_btnClose');
const headNavMenu = document.querySelector('.head__nav-menu');
const navMenuLiningAdaptive = document.querySelector('.head__nav-menu_menuLiningAdaptive');


function openBurgerMenu() {
	headNavMenu.style.display = `flex`;
	navMenuLiningAdaptive.style.cssText = `
		width: 100%; 
		height: 1000px;
		top: 0px;
		left: 0px;
		background-color: #44444459;
	`;
	let buttonWidth;
	let buttonHeight;
	let btnCloseWidth;
	let paddingLeftbtnClose;
	if (window.innerWidth <= 780) {
		buttonWidth = "40";
		buttonHeight = "40";
		btnCloseWidth = "14";
		paddingLeftbtnClose = "6.2";
	} else {
		buttonWidth = "50";
		buttonHeight = "50";
		btnCloseWidth = "20";
		paddingLeftbtnClose = "0";
	}
	this.style.cssText = `
		width: ${buttonWidth}px; 
		height: ${buttonHeight}px;
		padding-left: ${paddingLeftbtnClose}px;
		margin-left: 30px;
		margin-top: 20px;
		border-radius: 50%;
		background-color: #fff;
		gap: 0px;
		border: 0.8px solid #00000070;
	`;
	rootStyle.style.cssText = `
	--heightCloseLine: 0.8px;
	--afterBtnClose: rotate(55deg);
	--beforeBtnClose: rotate(-55deg);
	--btnCloseWidth: ${btnCloseWidth}px;
	--btnCloseLineColor: #00000070;
	--btnCloseCenterLineColor: #fff;
	--menuCenterLineHoverMarginBottom: 0px;
	--menuCenterLineHoverMarginTop: 0px;
	--lineCenterPosition: static;
	`;
	navMenuBtnClose.removeEventListener('click', openBurgerMenu);
	navMenuBtnClose.addEventListener('click', closeBurgerMenu);
}

function closeBurgerMenu() {
	headNavMenu.style.display = `none`;
	navMenuLiningAdaptive.style.cssText = `
		width: 37px; 
		height: 28px;
		top: 13.5px;
		left: 33px;
		background-color: #fff;
	`;
	this.style.cssText = `
		width: 37px; 
		height: 28px;
		margin-left: 0px;
		margin-top: 0px;
		padding-left: 0px;
		border-radius: 0;
		background-color: #fff;
		gap: 5.5px;
		border: none;
	`;
	rootStyle.style.cssText = `
	--heightCloseLine: 2px;
	--afterBtnClose: rotate(0deg);
	--beforeBtnClose: rotate(0deg);
	--btnCloseWidth: 20px;
	--btnCloseLineColor: #000;
	--btnCloseCenterLineColor: #000;
	--menuCenterLineHoverMarginBottom: 6px;
	--menuCenterLineHoverMarginTop: 20px;
	--lineCenterPosition: absolute;
	`;
	navMenuBtnClose.removeEventListener('click', closeBurgerMenu);
	navMenuBtnClose.addEventListener('click', openBurgerMenu);
}

navMenuBtnClose.addEventListener('click', openBurgerMenu);

// Скрипт для слайдера

let lengthArayDataProduct = dataProduct.length; // Длина массива

// Создаем карточки продуктов
const imagesContainer = document.querySelector('.slider__imagesContainer');
dataProduct.forEach(data => {
	if (data.specialOfferImage == "") { // Шаблон для создания карточки с описанием и кнопкой
		imagesContainer.insertAdjacentHTML('beforeend', `
		<div class="slider__cardProduct backgroundOfferCenter" style="background-image: url(${data.backgroundImage});" id="${data.id}">
			<div class="slider__cardContent ${data.classSpecialOffer}">
				<h1 class="slider__cardContent_title">${data.description}</h1>
				<a href="./catalog.html" class="slider__cardButton nonStylesLinkTeg">ПЕРЕЙТИ К КАТАЛОГУ</a>
			</div>
		</div>
	`);
	} else { // Шаблон для создания карточки с картинкой - хит, распродажа и описанием с кнопкой
		imagesContainer.insertAdjacentHTML('beforeend', `
		<div class="slider__cardProduct backgroundOfferRight" style="background-image: url(${data.backgroundImage});" id="${data.id}">
			<div class="slider__cardContent">
				<img src="${data.specialOfferImage}" class="${data.classOfferImage}" alt="Специальное предложение">
				<h3 class="slider__cardContent_title">${data.description}</h3>
				<a href="./catalog.html" class="slider__cardButton nonStylesLinkTeg">ПЕРЕЙТИ К КАТАЛОГУ</a>
			</div>
		</div>
	`);
	}
});

// Создаем кнопки переключения для слайдера
const inputsContaiener = document.querySelector('.slider__inputsContainer');
function createCheckButton(data) {
	data.forEach(uniqueID => {
		inputsContaiener.insertAdjacentHTML('beforeend', `
		<button class="buttonSwitching slider__inputDeactive" id="${uniqueID.id}"></button>
	`);
	})
	document.querySelectorAll('.buttonSwitching').forEach(item => {
		if (item.getAttribute('id') == 1) {
			item.classList.remove('slider__inputDeactive');
			item.classList.add('slider__inputActive');
		}
	})
}
createCheckButton(dataProduct);

const cardProduct = document.querySelectorAll('.slider__cardProduct');
const buttonSwitching = document.querySelectorAll('.buttonSwitching');

// Создаем функцию, которая открывает карточку и подсвечивает кнопку переключения в зависимости от переданного ей id
function sortThroughBlocks(numberId) {
	cardProduct.forEach(change => { // Карточки
		if (change.getAttribute('id') == numberId) {
			change.classList.add('blockActive')
			change.style.display = `block`;
		} else {
			change.classList.remove('blockActive')
			change.style.display = `none`;
		}
	})
	buttonSwitching.forEach(item => { // Кнопки 
		if (item.getAttribute('id') == numberId) {
			item.classList.remove('slider__inputDeactive');
			item.classList.add('slider__inputActive');
		} else {
			item.classList.add('slider__inputDeactive');
			item.classList.remove('slider__inputActive');
		}
	})
}

// Событие загрузки слайдера при загрузке страницы
window.addEventListener('load', function (e) {
	sortThroughBlocks(1);
})
// Событие для переключение карточек с помощью кнопок
buttonSwitching.forEach(change => {
	change.addEventListener('click', function (e) {
		let idChangeElem = e.target.getAttribute('id');
		sortThroughBlocks(idChangeElem);
	})
});

// Функция для переключения слайда вправо
function switchedRightSlide() {
	let elemDisplayBlock = 0;
	cardProduct.forEach(card => {
		if (card.style.display == `block`) {
			elemDisplayBlock += Number(card.getAttribute('id')) + 1;
		}
	})
	if (elemDisplayBlock == lengthArayDataProduct + 1) {
		sortThroughBlocks(1);
	} else {
		sortThroughBlocks(elemDisplayBlock);
	}
}
// Событие переключения карточек правой стрелкой
const arrowRight = document.querySelector('#arrowRight');

arrowRight.addEventListener('click', switchedRightSlide);

// Таймер для автоматического переключения слайдов
let intervalSwitchedSlide = setInterval(() => {
	switchedRightSlide()
}, 20000);

// Событие переключения карточек левой стрелкой
const arrowLeft = document.querySelector('#arrowLeft');
arrowLeft.addEventListener('click', function () {
	let elemDisplayBlock = 0;
	cardProduct.forEach(card => {
		if (card.style.display == `block`) {
			elemDisplayBlock += Number(card.getAttribute('id')) - 1;
		}
	})
	if (elemDisplayBlock == 0) {
		sortThroughBlocks(3);
	} else {
		sortThroughBlocks(elemDisplayBlock);
	}
})

// Выгрузка товаров раздела "Распродажа" на страницу
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
createProductSaleSection()

// Выгрузка товаров раздела "Акция" на страницу
const cardContainerStock = document.querySelector('.discounted__cardContainerStock');

function createProductsPromotionSection() {
	dataStock.forEach(prod => {
		cardContainerStock.insertAdjacentHTML('beforeend', `
	<div class="discounted__card">
	<div class="discounted__photoProduct" id="${prod.id}"
	style="background-image: url(${prod.photoProduct}); width: ${prod.widthImage}px;">
	<div id="${prod.id}" class="discounted__photoProduct_favourites"></div>
	<div class="discounted__photoProduct_stock">-${prod.stock}%</div>
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
createProductsPromotionSection();

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