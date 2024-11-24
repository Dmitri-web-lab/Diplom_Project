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
	this.style.cssText = `
		width: 50px; 
		height: 50px;
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
		border-radius: 0;
		background-color: #fff;
		gap: 5.5px;
		border: none;
	`;
	/* Для изменения параметров кнопки при адаптиве для мобильников
let testPosition;
	if (window.innerWidth <= 550) {
		testPosition = "absolute";
	} else {
		testPosition = "static";
	}
	*/
	rootStyle.style.cssText = `
	--heightCloseLine: 2px;
	--afterBtnClose: rotate(0deg);
	--beforeBtnClose: rotate(0deg);
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
				<a href="./catalog.html" class="slider__cardButton">ПЕРЕЙТИ К КАТАЛОГУ</a>
			</div>
		</div>
	`);
	} else { // Шаблон для создания карточки с картинкой - хит, распродажа и описанием с кнопкой
		imagesContainer.insertAdjacentHTML('beforeend', `
		<div class="slider__cardProduct backgroundOfferRight" style="background-image: url(${data.backgroundImage});" id="${data.id}">
			<div class="slider__cardContent">
				<img src="${data.specialOfferImage}" class="${data.classOfferImage}" alt="Специальное предложение">
				<h3 class="slider__cardContent_title">${data.description}</h3>
				<a href="./catalog.html" class="slider__cardButton">ПЕРЕЙТИ К КАТАЛОГУ</a>
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

dataSale.forEach(prod => {
	cardContainer.insertAdjacentHTML('beforeend', `
	<div class="discounted__card">
	<div class="discounted__photoProduct" id="${prod.id}"
	style="background-image: url(${prod.photoProduct}); width: ${prod.widthImage}px;">
	<div class="discounted__photoProduct_favourites"></div>
</div>
<h4 class="discounted__cardTitle">${prod.title}</h4>
<p class="discounted__cardSubtitle">${prod.subtitle}</p>
<div class="discounted__cardArticul">Артикул: <b>${prod.articul}</b></div>
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
<button class="discounted__addBasket">ДОБАВИТЬ В КОРЗИНУ</button>
</div>
	`);
});

// Выгрузка товаров раздела "Акция" на страницу
const cardContainerStock = document.querySelector('.discounted__cardContainerStock');

dataStock.forEach(prod => {
	cardContainerStock.insertAdjacentHTML('beforeend', `
	<div class="discounted__card">
	<div class="discounted__photoProduct" id="${prod.id}"
	style="background-image: url(${prod.photoProduct}); width: ${prod.widthImage}px;">
	<div class="discounted__photoProduct_favourites"></div>
	<div class="discounted__photoProduct_stock">-${prod.stock}%</div>
</div>
<h4 class="discounted__cardTitle">${prod.title}</h4>
<p class="discounted__cardSubtitle">${prod.subtitle}</p>
<div class="discounted__cardArticul">Артикул: <b>${prod.articul}</b></div>
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
<button class="discounted__addBasket">ДОБАВИТЬ В КОРЗИНУ</button>
</div>
	`);
});
