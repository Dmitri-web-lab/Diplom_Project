const ordersContainer = document.querySelector(".orders__container");
const ordersDefaultOrderBlock = document.querySelector('.orders__defaultOrderBlock');

let email = 'example@gmail.com';
let getOrdersArray = localStorage.getItem(email);
let parseOrders = JSON.parse(getOrdersArray);

function exampleOrdersDefault() {
	if (parseOrders.length == 0) {
		ordersDefaultOrderBlock.style.display = `flex`;
	} else {
		ordersDefaultOrderBlock.style.display = `none`;
	}
}
exampleOrdersDefault();

parseOrders.forEach(data => {
	let choiceColor;
	let choiceColorQuantity;
	let choiceColorDelButton;
	let choiceQuantityCountResult;
	let choiceImageColor;
	if (data.id % 2 != 0) {
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
	ordersContainer.insertAdjacentHTML('beforeend', `
	<div id="${data.id}" class="orders__orderProduct ${choiceColor}">
	<div class="orders__description">${data.description}</div>
	<div class="orders__article">Артикул: ${data.article}</div>
	<div class="orders__quantity">
		<div class="orders__quantity_desc">Количество:</div>
		<div class="orders__quantity_count">
			<button class="orders__quantity_countSubtract ${choiceColorQuantity}">-</button>
			<div class="orders__quantity_countResult ${choiceQuantityCountResult}">${data.quantity}</div>
			<button class="orders__quantity_countAdd ${choiceColorQuantity}">+</button>
		</div>
	</div>
	<div class="orders__page">Страница: ${data.page}</div>
	<div class="orders__priceContainer">
		<div class="orders__price">Цена: 1000</div>
		<img class="orders__priceCurrency" src="${choiceImageColor}">
	</div>
	<button id="${data.id}" class="orders__deleteProduct ${choiceColorDelButton}">X</button>
</div>
	`);
});
const headUserFunctionsCountBuy = document.querySelector('.head__userFunctions_countBuy');
headUserFunctionsCountBuy.textContent = `${parseOrders.length}`;

const ordersDeleteProduct = document.querySelectorAll('.orders__deleteProduct');
const ordersOrderProduct = document.querySelectorAll('.orders__orderProduct');

ordersDeleteProduct.forEach(button => {
	button.addEventListener('click', (event) => {
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
	})
})