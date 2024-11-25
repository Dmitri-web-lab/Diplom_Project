const ordersContainer = document.querySelector(".orders__container");

dataBasket.forEach(data => {
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
	<div class="orders__orderProduct ${choiceColor}">
	<div cla65ттss="orders__description">${data.name}</div>
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
		<div class="orders__price">Цена: ${data.price}</div>
		<img class="orders__priceCurrency" src="${choiceImageColor}">
	</div>
	<button class="orders__deleteProduct ${choiceColorDelButton}">X</button>
</div>
	`);
});
