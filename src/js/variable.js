import { root } from 'postcss';
import {
	darkmodeChange,
	darkmodeElement,
	fisrtNumberElement,
	operatorElement,
	resultoptionsElement,
	roundCounter,
	satartGameButton,
	scoreElement,
	secondNumberElement,
	sound,
	totalPointsElement,
	totaloperationsElement,
	totalpointscontainer
} from './dom';
let firstrandomnumber;
let secondrandomnumber;
let similarResult1;
let similarResult2;
let operator;
let result;
let counter = 0;
let timerInterval;
let pointsCounter = 0;
let totaltime = 60;
let playeroption;
const startGame = () => {
	randomnumbers();
	startTimer();
};
const randomnumbers = () => {
	firstrandomnumber = Math.floor(Math.random() * 101);
	secondrandomnumber = Math.floor(Math.random() * 101);
	scoreElement.innerHTML =
		'<i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ' +
		pointsCounter;
	randomoperator();
	fillNumbers();
	operationResult();
	buildFinalTable();
	fillTotalOperationTable();
};
const randomoperator = () => {
	const operators = ['-', '+'];
	const randomnumber = Math.floor(Math.random() * 2);
	operator = operators[randomnumber];
	operatorElement.textContent = operator;
};

const fillNumbers = () => {
	fisrtNumberElement.textContent = firstrandomnumber;
	secondNumberElement.textContent = secondrandomnumber;
};

const operationResult = () => {
	const firstNumber = parseFloat(firstrandomnumber);
	const secondNumber = parseFloat(secondrandomnumber);

	switch (operator) {
		case '+':
			result = firstNumber + secondNumber;
			break;
		case '-':
			result = firstNumber - secondNumber;
			break;
		case '*':
			result = firstNumber * secondNumber;
			break;
		case '/':
			result = firstNumber / secondNumber;
			break;
		default:
			console.log('Operador no válido.');
			return;
	}
	writeResult();
	playerAnswer();
};
const writeResult = () => {
	if (counter < 10) {
		roundCounter.textContent = `0${counter}`;
	} else {
		roundCounter.textContent = counter;
	}
	const randomNumbers = [0, 1, 2];
	const randomNumebr1 = Math.floor(Math.random() * 3);
	const remainingNumbers = randomNumbers.filter(num => num !== randomNumebr1);
	const randomNumebr2 =
		remainingNumbers[Math.floor(Math.random() * remainingNumbers.length)];
	const randomNumebr3 = remainingNumbers.filter(
		num => num !== randomNumebr2
	)[0];

	// Rango de variación para los números parecidos al resultado correcto
	const variationRange = 10;
	similarResult1 = Math.max(
		0,
		result - Math.floor(Math.random() * variationRange)
	);
	similarResult2 = Math.min(
		100,
		result + Math.floor(Math.random() * variationRange)
	);

	resultoptionsElement.children[randomNumebr1].textContent = result;
	resultoptionsElement.children[randomNumebr2].textContent = similarResult1;
	resultoptionsElement.children[randomNumebr3].textContent = similarResult2;
};
const playerAnswerHandler = event => {
	const clickedonpElement = event.target;
	if (clickedonpElement.closest('.option')) {
		playeroption = event.target.textContent;
		if (playeroption === result.toString()) {
			pointsCounter = pointsCounter + 100;
			scoreElement.innerHTML =
				'<i class="fa-solid fa-star" style="color: #FFD43B;"></i>' +
				pointsCounter;
			sound.setAttribute('src', './assets/win.mp3');
			sound.play();
			numberoperationplus(1);
		} else {
			sound.setAttribute('src', '/assets/lost.mp3');
			sound.play();
			numberoperationplus(1);
		}

		randomnumbers();
	}
};
const playerAnswer = () => {
	resultoptionsElement.removeEventListener('click', playerAnswerHandler);

	resultoptionsElement.addEventListener('click', playerAnswerHandler);
};
const updateTimer = () => {
	const timerElement = document.getElementById('timer');
	let minutes = Math.floor(totaltime / 60);
	let seconds = totaltime % 60;

	// Agregar un cero delante si los minutos o segundos son menores que 10
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	// Actualizar el contenido del temporizador
	timerElement.textContent = `${minutes}:${seconds}`;

	// Si el tiempo se ha agotado, detener el temporizador
	if (totaltime <= 0) {
		clearInterval(timerInterval);
		timefinished();
	} else {
		totaltime--;
	}
};
const timefinished = () => {
	if (totaltime === 0) {
		totalPointsElement.innerHTML =
			'<i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ' +
			pointsCounter;
		satartGameButton.disabled = false;
		totalpointscontainer.classList.remove('hide');
		totaloperationsElement.classList.remove('hide');
	}
	pointsCounter = 0;
	generatebuttonplayagain();
};
const startTimer = () => {
	updateTimer();
	// Actualizar el temporizador cada segundo
	timerInterval = setInterval(updateTimer, 1000);
};
const buildFinalTable = () => {
	const operations = document.createElement('div');
	operations.classList.add('rows');
	const operation = document.createElement('p');
	operation.classList.add('operationfinishtable');
	const symbol = document.createElement('p');
	const resultchoosen = document.createElement('p');
	resultchoosen.classList.add('resultfinishtable');
	operations.append(operation, symbol, resultchoosen);
	totaloperationsElement.append(operations);
};
const fillTotalOperationTable = () => {
	totaloperationsElement.children[counter].children[0].textContent =
		`${firstrandomnumber} ${operator} ${secondrandomnumber}`;
	totaloperationsElement.children[counter].children[1].textContent = '=';
	totaloperationsElement.children[counter].children[2].textContent =
		playeroption;
	hideFirstChallenge();
};
const numberoperationplus = value => {
	counter += value;
};
const hideFirstChallenge = () => {
	totaloperationsElement.children[0].children[0].classList.add('hide');
	totaloperationsElement.children[0].children[1].classList.add('hide');
	totaloperationsElement.children[0].children[2].classList.add('hide');
};
const darkToLight = () => {
	darkmodeChange.innerHTML =
		'<i id="moon" class="fa-solid fa-moon" style="color: #000000;"></i>';
	root.style.setProperty('--dark--bg', '#ffffff');
	root.style.setProperty('--white--font', 'black');

	const lightmodeElement = document.getElementById('moon');
	lightmodeElement.addEventListener('click', lightToDark);
};
const generatebuttonplayagain = () => {
	const playagainButton = document.createElement('button');
	playagainButton.classList.add('playagain');
	playagainButton.textContent = 'Play Again';
	playagainButton.id = 'playagainbutton';
	totalpointscontainer.append(playagainButton);
	playagainButton.addEventListener('click', playagain);
};
const playagain = () => {
	location.reload();
};
const lightToDark = () => {
	darkmodeChange.innerHTML =
		'<i id="sun" class="fa-solid fa-sun" style="color: #ffffff;"></i>';
	root.style.setProperty('--dark--bg', '#454545');
	root.style.setProperty('--white--font', '#E6E6E6');
	const darkmodeElement = document.getElementById('sun');
	darkmodeElement.addEventListener('click', darkToLight);
};
darkmodeElement.addEventListener('click', darkToLight);
satartGameButton.addEventListener('click', () => {
	satartGameButton.disabled = true;

	startGame();
});

export {
	startGame,
	randomnumbers,
	startTimer,
	randomoperator,
	fillNumbers,
	operationResult,
	writeResult,
	playerAnswer,
	playerAnswerHandler,
	updateTimer,
	timefinished,
	buildFinalTable,
	fillTotalOperationTable,
	numberoperationplus,
	hideFirstChallenge,
	darkToLight,
	generatebuttonplayagain,
	playagain,
	lightToDark
};
