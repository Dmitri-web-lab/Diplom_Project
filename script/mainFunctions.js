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