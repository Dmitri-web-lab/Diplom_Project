const ordersContainer = document.querySelector(".orders__container");
const ordersDefaultOrderBlock = document.querySelector('.orders__defaultOrderBlock');
const ordersCostProd = document.querySelectorAll('.orders__costProd');

let email = 'example@gmail.com';
let getOrdersArray = localStorage.getItem(email);
let parseOrders = JSON.parse(getOrdersArray);

function convertGetLocalStorage() { // Функция для преобразования полученных данных из localStorage в объект
	let getOrdersArray = localStorage.getItem(email);
	let parseOrders = JSON.parse(getOrdersArray);
	return parseOrders;
}

function convertSetLocalStorage(data) { // Функция для преобразования объекта в строку для записи в localStorage
	let strokeArrayOrders = JSON.stringify(data);
	localStorage.setItem(email, strokeArrayOrders);
}

function recalculationCostQuantityPrice() { // Пересчет стоимости в зависимости от количества и цены товара
	let calculatingTotalCost = 0;

	const allOrderProduct = document.querySelectorAll('.orders__orderProduct');

	allOrderProduct.forEach(orderField => {

		const selectedQuantity = orderField.querySelector('.orders__quantity_countResult');
		const selectedPrice = orderField.querySelector('.orders__costProd');

		let numberSelectedQuantity = Number(selectedQuantity.textContent); // количество товара - число
		let numberSelectedPrice = Number(selectedPrice.textContent); // цена товара - число
		let resultSelectedField = numberSelectedQuantity * numberSelectedPrice;
		calculatingTotalCost += resultSelectedField;
	})

	// Вывод общей стоимости на страницу
	const ordersСost = document.querySelector('.orders__cost');
	ordersСost.textContent = `Общая стоимость: ${calculatingTotalCost}`;

}


function exampleOrdersDefault() {
	if (parseOrders.length == 0) {
		ordersDefaultOrderBlock.style.display = `flex`;
	} else {
		ordersDefaultOrderBlock.style.display = `none`;
	}
}
exampleOrdersDefault();

// Функция по нахождению и определению цены товара по артиклю
function assigningValueProduct(articleElem) {
	let cost = 0;
	costOrder.forEach(searchCost => {
		if (searchCost.article == articleElem) {
			cost += searchCost.price;
		}
	});
	return cost; // Возвращает цену
};

//
function createEventQuantityCount(ordersQuantityCountAdd) {
	ordersQuantityCountAdd.forEach(countAddButton => {
		countAddButton.addEventListener('click', (event) => {
			let selectedButtonAndCount;
			let elementNumber;
			console.log(event.target.textContent);
			if (event.target.textContent == '+') {
				selectedButtonAndCount = event.target.previousElementSibling;
				elementNumber = Number(selectedButtonAndCount.textContent);
				elementNumber++;
			} else {
				selectedButtonAndCount = event.target.nextElementSibling;
				elementNumber = Number(selectedButtonAndCount.textContent);
				elementNumber--;
			}

			selectedButtonAndCount.textContent = `${elementNumber}`;
			let attributePreviousElement = selectedButtonAndCount.getAttribute('id');
			let parseDataOrder = convertGetLocalStorage();
			parseDataOrder.forEach(data => {
				if (data.id == attributePreviousElement) {
					data.quantity = elementNumber;
				}
			})

			convertSetLocalStorage(parseDataOrder);
			recalculationCostQuantityPrice();
		})
	});
}
//

function addEventButtonDeleteOrder(event) { // Функция, которая устанавливает события на кнопки для удаления строк заказа. Функция цикличная и активируется каждый раз когда загружаются поля заказов.
	const ordersOrderProduct = document.querySelectorAll('.orders__orderProduct');

	ordersOrderProduct.forEach(order => {

		if (order.getAttribute('id') == event.target.getAttribute('id')) {
			let orderAttribute = order.getAttribute('id');
			order.remove();

			parseOrders.forEach(element => {
				if (element.id == orderAttribute) {
					let indexDataElement = parseOrders.indexOf(element);
					parseOrders.splice(indexDataElement, 1);
					let stringArrayNewData = JSON.stringify(parseOrders);
					localStorage.setItem(email, stringArrayNewData);
					headUserFunctionsCountBuy.textContent = `${parseOrders.length}`;
					exampleOrdersDefault();
				}
			})
		}
	})

	ordersOrderProduct.forEach(remElements => {
		remElements.remove(); // Удаляем поля для повторной выгрузки - альтернатива метода location.reload(), но в этом случае без перезагрузки страницы
	})
	creatingOrderFieldsPage(); // Выгрузка заказов заново на страницу

	createEventQuantityCount(document.querySelectorAll('.orders__quantity_countAdd')); // Создание события для кнопки "+"
	createEventQuantityCount(document.querySelectorAll('.orders__quantity_countSubtract')); // Создание события для кнопки "-"

	recalculationCostQuantityPrice(); // Подсчет общей стоимости заказа
}

let countOrdersColor = 1;

function creatingOrderFieldsPage() {
	parseOrders.forEach(data => {
		let choiceColor;
		let choiceColorQuantity;
		let choiceColorDelButton;
		let choiceQuantityCountResult;
		let choiceImageColor;
		if (countOrdersColor % 2 != 0) {
			choiceColor = "orders__orderProductColor";
			choiceColorQuantity = "orders__quantity_countColor";
			choiceColorDelButton = "orders__deleteProductColor";
			choiceQuantityCountResult = "orders__quantity_countResultColor";
			choiceImageColor = "./images/images_basketPage/rubWhite.svg"
		} else {
			choiceColor = "orders__orderProductGrey";
			choiceColorQuantity = "orders__quantity_countBlack";
			choiceColorDelButton = "orders__deleteProductGrey";
			choiceQuantityCountResult = "orders__quantity_countResultBlack";
			choiceImageColor = "./images/images_basketPage/rubBlack.svg"
		}

		let priceProd = assigningValueProduct(Number(data.article)); // Передаем артикул для поиска цены товара в базе

		ordersContainer.insertAdjacentHTML('beforeend', `
	<div id="${data.id}" class="orders__orderProduct ${choiceColor}">
	<div class="orders__description">${data.description}</div>
	<div class="orders__article">Артикул: ${data.article}</div>
	<div class="orders__quantity">
		<div class="orders__quantity_desc">Количество:</div>
		<div class="orders__quantity_count">
			<button class="orders__quantity_countSubtract ${choiceColorQuantity}">-</button>
			<div id="${data.id}" class="orders__quantity_countResult ${choiceQuantityCountResult}">${data.quantity}</div>
			<button class="orders__quantity_countAdd ${choiceColorQuantity}">+</button>
		</div>
	</div>
	<div class="orders__page">Страница: ${data.page}</div>
	<div class="orders__priceContainer">
		<div class="orders__price">Цена: <span class="orders__costProd">${priceProd}<span></div>
		<img class="orders__priceCurrency" src="${choiceImageColor}">
	</div>
	<button id="${data.id}" class="orders__deleteProduct ${choiceColorDelButton}">X</button>
</div>
	`);
		// Счетчик для раскрашивания полей заказа
		++countOrdersColor;

	});

	const ordersDeleteProduct = document.querySelectorAll('.orders__deleteProduct'); // Получаем все кнопки, которые удаляют заказ
	ordersDeleteProduct.forEach(button => {
		button.addEventListener('click', addEventButtonDeleteOrder); // Устанавливаем событие для удаления строки заказа
	})

}


// Количество товара в корзине
const headUserFunctionsCountBuy = document.querySelector('.head__userFunctions_countBuy');
headUserFunctionsCountBuy.textContent = `${parseOrders.length}`;

creatingOrderFieldsPage(); // Вывод карточек при начальной загрузке страницы

recalculationCostQuantityPrice(); // Подсчет общей стоимости заказа

createEventQuantityCount(document.querySelectorAll('.orders__quantity_countAdd')); // Создание события для кнопки "+"
createEventQuantityCount(document.querySelectorAll('.orders__quantity_countSubtract')); // Создание события для кнопки "-"