'use strict';

function gid(i) {return document.getElementById(i);}

function gcd (a, b) { // НОД для 2-х чисел
	if (!b) {return a;}
	return gcd(b, a % b);
};

function scm (x, y) {return (x*y) / gcd(x, y);} // НОК для 2-х чисел

function NOK(arr) { // НОК для массива чисел
	return arr.reduce(function (x, y) {return scm(x, y);});
}


function init() {
	Vue.component('fraction', {
		template: '#fraction-template',
		props: ['somelink'],
		data: function() {
			return {
				keys: ['0','1','2','3','4','5','6','7','8','9','Backspace','Del','Delete','F5','Tab'],
			}
		}, // data
		methods: {
			validate: function(e) {
				if (this.keys.indexOf(e.key) < 0) {
					e.preventDefault();
					return false;
				}
			}, // validate
		} // methods
	}); // Vue.component('fraction')

	var appMain = new Vue({
		el: '#main',
		data: {
			inpData: [
				{numerator: '', denominator: ''},
				{numerator: '', denominator: ''},
			],
		}, // data
		computed: {
			result: function() {
				var arr_num = [], arr_den = []; // отдельный массивы для числителя и знаменателя
				this.inpData.forEach(function(elem) {
					arr_num.push(elem['numerator']);
					arr_den.push(elem['denominator']);
				});

				var nok = NOK(arr_den), summa = 0; // summa - для складывания числителя

				arr_num.forEach(function(elem, i) { // приведение к общему знаменателю
					arr_num[i] = nok / arr_den[i] * elem;
					summa += arr_num[i];
				});

				var NOD = gcd(summa, nok);
				return { // если ОК, то сделаем сокращение дробей
					num: isNaN(NOD) ? '' : summa / NOD,
					den: isNaN(NOD) ? '' : nok   / NOD
				};
			}, // result
		}, // computed
	}); // var appMain = new Vue


	/******************************************************************************************************************/
	gid('add-fraction').addEventListener('click', addFraction);
	function addFraction() { // добавление новой дроби
		appMain.inpData.push({numerator: '', denominator: ''});

		if (appMain.inpData.length > 5) { // Максимальное количество дробей = 6, кнопка становится неактивной
			this.style.color = '#aaa';
			this.onmousedown = function() {return false;}
			this.removeEventListener('click', addFraction);
		}
	} // addFraction
} // init

document.body.onload = init;
