// Данные о спецпредложениях
const dataProduct = [{
	id: 1,
	backgroundImage: "./images/images_slider/one_backCard.png",
	specialOfferImage: "./images/images_slider/hitProduct.png",
	classOfferImage: "slider__imageHit",
	description: "Мерцающая помада увлажняет благодаря маслам авокадо, кунжута и витамину Е, а 3D-пигменты дарят сияние!"
}, {
	id: 2,
	backgroundImage: "./images/images_slider/two_backCard.png",
	specialOfferImage: "./images/images_slider/newProduct.png",
	classOfferImage: "slider__imageNew",
	description: "Новое поступление ароматов imary black. Количество ограничено!"
}, {
	id: 3,
	backgroundImage: "./images/images_slider/three_backCard.png",
	specialOfferImage: "",
	classSpecialOffer: "slider__contentCenter",
	description: "Осенние скидки до 30% и специальные предложения на средства по уходу за кожей"
}];

// Данные о продуктов для распродажи
const dataSale = [
	{
		id: 10,
		relationship: "sale",
		widthImage: 200,
		photoProduct: "./images/discounted_products/todayTomorrow.png",
		description: "Today Tomorrow",
		subtitle: "Парфюмерная вода для нее, 50 мл",
		article: 123456,
		price: 1058,
		oldPrice: 1589,
		page: 25
	},
	{
		id: 20,
		relationship: "sale",
		widthImage: 101.3,
		photoProduct: "./images/discounted_products/coffeeMask.png",
		description: "Cofee Mask",
		subtitle: "Питательная маска с богатыми маслами, 75 мл",
		article: 789125,
		price: 998,
		oldPrice: 1200,
		page: 25
	},
	{
		id: 30,
		relationship: "sale",
		widthImage: 110,
		photoProduct: "./images/discounted_products/avonLuckProd.jpg",
		description: "Avon Luck",
		subtitle: "Туалетная вода для него, 75 мл",
		article: 538288,
		price: 1099,
		oldPrice: 2199,
		page: 25
	},
];

// Данные о продуктах для акций
const dataStock = [
	{
		id: 40,
		relationship: "stock",
		widthImage: 110,
		stock: 20,
		photoProduct: "./images/discounted_products/perceiveDew.jpg",
		description: "Perceive Dew",
		subtitle: "Инновационный набор для нее, 45 мл",
		article: 648587,
		price: 1429,
		oldPrice: 2264,
		page: 25
	},
	{
		id: 50,
		relationship: "stock",
		widthImage: 110,
		stock: 10,
		photoProduct: "./images/discounted_products/incandessence.jpg",
		description: "Incandessence",
		subtitle: "Парфюмерная вода для нее, 30 мл",
		article: 599718,
		price: 619,
		oldPrice: 1249,
		page: 25
	},
	{
		id: 60,
		relationship: "stock",
		widthImage: 110,
		stock: 15,
		photoProduct: "./images/discounted_products/littleBlackDress.jpg",
		description: "Little Black Dress",
		subtitle: "Парфюмерная вода для нее, 10 мл",
		article: 645195,
		price: 349,
		oldPrice: 499,
		page: 25
	},
];
// Данные для страницы корзины
const dataBasket = [{
	id: 1,
	name: "Туалетная вода HUGO BOSS",
	article: 325687,
	quantity: 1,
	page: 25,
	price: 1284
},
{
	id: 2,
	name: "Туалетная вода HUGO BOSS",
	article: 123789,
	quantity: 1,
	page: 68,
	price: 884
},
{
	id: 3,
	name: "Туалетная вода HUGO BOSS",
	article: 123789,
	quantity: 1,
	page: 68,
	price: 884
},
{
	id: 4,
	name: "Туалетная вода HUGO BOSS",
	article: 123789,
	quantity: 1,
	page: 68,
	price: 884
}
];

// Данные о стоимости товара
const costOrder = [
	{ article: 454445, price: 1000 }, { article: 645327, price: 1500 },
	{ article: 648587, price: 1429 }, { article: 123456, price: 1058 },
	{ article: 789125, price: 998 }, { article: 538288, price: 1099 },
	{ article: 599718, price: 619 }, { article: 645195, price: 349 }
]