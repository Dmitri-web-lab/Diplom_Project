// Переключение блока "Вход" и "Регистрация" на странице аккаунта

const switchedFormEntrance = document.querySelector('.switchedFormEntrance');
const switchedFormRegistration = document.querySelector('.switchedFormRegistration');
const accountSelectionLineEntrance = document.querySelector('.account__selectionLine_entrance');
const accountSelectionLineRegistration = document.querySelector('.account__selectionLine_registration');

accountSelectionLineEntrance.addEventListener('click', function () {
	switchedFormEntrance.style.display = `flex`;
	switchedFormRegistration.style.display = `none`;
	this.style.cssText = `border-bottom: 1px solid #000; color: #000;`;
	accountSelectionLineRegistration.style.cssText = `border-bottom: none; color: #adadad;`;
});

accountSelectionLineRegistration.addEventListener('click', function () {
	switchedFormEntrance.style.display = `none`;
	switchedFormRegistration.style.display = `block`;
	this.style.cssText = `border-bottom: 1px solid #000; color: #000;`;
	accountSelectionLineEntrance.style.cssText = `border-bottom: none;  color: #adadad;`;
});