/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function () {
    createCookieTable();
});

addButton.addEventListener('click', () => {
    if (addNameInput.value && addValueInput.value) {
        document.cookie = addNameInput.value + '=' + addValueInput.value;
        addNameInput.value = '';
        addValueInput.value = '';
        createCookieTable();
    }
});

listTable.addEventListener('click', function (e) {
    let name = e.target.parentNode.parentNode.children[0].innerText;

    if (e.target.id === 'remove-button' && name) {
        document.cookie = name + '=; ' + 'expires' + '=' + new Date(-1);
    }
    createCookieTable();
})

function isMatching(fullName, fullValue, chunk) {
    if (!chunk) {
        return false;
    }
    if (~fullName.toLowerCase().indexOf(chunk.toLowerCase())) {
        return true;
    }
    if (~fullValue.toLowerCase().indexOf(chunk.toLowerCase())) {
        return true;
    }

    return false;
}

function createCookieTable() {
    let cookie = document.cookie,
        cookieArr = cookie.split('; '),
        cookieObj;

    cookieObj = cookieArr.reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});
    listTable.innerHTML = '';
    if (cookie) {
        for (let key in cookieObj) {
            if (!filterNameInput.value.trim()) {
                listTable.innerHTML +=
                    '<tr>' +
                    '<td>' + key + '</td>' +
                    '<td>' + cookieObj[key] + '</td>' +
                    '<td><button id="remove-button">Удалить</button></td>' +
                    '</tr>';
            }
            if (isMatching(key, cookieObj[key], filterNameInput.value.trim())) {
                listTable.innerHTML +=
                    '<tr>' +
                    '<td>' + key + '</td>' +
                    '<td>' + cookieObj[key] + '</td>' +
                    '<td><button id="remove-button">Удалить</button></td>' +
                    '</tr>';
            }
        }
    }

}
createCookieTable()