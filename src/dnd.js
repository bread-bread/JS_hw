/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let newDiv = document.createElement('div'),
        width = randomInt(300, 400),
        height = randomInt(300, 400);

    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function randomColor() {
        let colorCode = '0123456789ABCDEF'.split(''),
            color = '#',
            i;

        for (i = 0; i < 6; i++) {
            color += colorCode[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    newDiv.classList.add('draggable-div');
    // newDiv.setAttribute('draggable', 'true');
    newDiv.style.width = width + 'px';
    newDiv.style.height = height + 'px';
    newDiv.style.backgroundColor = randomColor();
    newDiv.style.position = 'absolute';
    newDiv.style.top = randomInt(0, (document.body.clientHeight - height)) + 'px';
    newDiv.style.left = randomInt(0, (document.body.clientWidth - width)) + 'px';

    return newDiv;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.onmousedown = function (e) {

        let coords = getCoords(target),
            shiftX = e.pageX - coords.left,
            shiftY = e.pageY - coords.top;

        moveAt(e);

        target.style.zIndex = 1000;

        function moveAt(e) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function (e) {
            moveAt(e);
        };

        target.onmouseup = function () {
            document.onmousemove = null;
            target.onmouseup = null;
        };

    }

    target.ondragstart = function () {
        return false;
    };

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
