const MENU = document.getElementById('menu');
const MENU1 = document.getElementById('1');
const MENU2 = document.getElementById('2');
const MENU3 = document.getElementById('3');
const DEF_STR = `This is a list of definitions.`;
const SYN_STR = `This is a list of synonyms`;
const GOO_STR = `This is a list of Google search results`;

function buttPress() {
	MENU.classList.toggle('show');
}

MENU.addEventListener('click', event => {
	if (MENU1.contains(event.target)) {
		if (MENU1.innerHTML !== DEF_STR) { MENU1.innerHTML = DEF_STR; }
		else {MENU1.innerHTML = 'Definitions:'}
	}
	else if (MENU2.contains(event.target)) {
		if (MENU2.innerHTML !== SYN_STR) { MENU2.innerHTML = SYN_STR; }
		else {MENU2.innerHTML = 'Synonyms:'}
	}
	else if (MENU3.contains(event.target)) {
		if (MENU3.innerHTML !== GOO_STR) { MENU3.innerHTML = GOO_STR; }
		else {MENU3.innerHTML = 'Google Results:'}
	}
});

window.onclick = function(event) {
	//when the window is clicked, close the menu unless the menu was clicked
	if (!event.target.matches('.button') && !MENU.contains(event.target)) {
		var dropdowns = document.getElementsByClassName('popup-defs');
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
	//when a menu item is clicked, populate it with data instead of a label
	if (document.getElementById('menu').contains(event.target)) {
		
	}
}