/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let ans = JSON.parse(xhr.responseText);

                ans.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }

                    return 0;

                })
                resolve(ans);
            } else {
                reject();
            }
        });
        xhr.addEventListener('error', () => {
            reject();
        })
    })
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    if (~full.toLowerCase().indexOf(chunk.toLowerCase())) {
        return true;
    }

    return false;
}

let homeworkContainer = document.querySelector('#homework-container'),
    loadingBlock = homeworkContainer.querySelector('#loading-block'),
    filterBlock = homeworkContainer.querySelector('#filter-block'),
    filterInput = homeworkContainer.querySelector('#filter-input'),
    filterResult = homeworkContainer.querySelector('#filter-result'),
    repeatBtn = document.createElement('button'),
    errorBlock = document.createElement('div'),
    citiesArr = [],
    thenFn = function (ans) {
        citiesArr = ans;
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
        errorBlock.style.display = 'none';
        repeatBtn.style.display = 'none';
    },
    catchFn = function () {
        loadingBlock.style.display = 'none';
        errorBlock.textContent = 'Не удалось загрузить города';
        repeatBtn.textContent = 'Повторить';
        homeworkContainer.appendChild(errorBlock);
        homeworkContainer.appendChild(repeatBtn);
    };

loadTowns()
    .then(thenFn)
    .catch(catchFn)

repeatBtn.addEventListener('click', () => {
    loadingBlock.style.display = 'block';
    loadTowns()
        .then(thenFn)
        .catch(catchFn)
})

filterInput.addEventListener('keyup', function() {
    filterResult.textContent = '';
    citiesArr.forEach(function (item) {
        if (isMatching(item.name, filterInput.value.trim())) {
            filterResult.innerHTML += item.name + '<br>';
        }
    })
    if (!filterInput.value) {
        filterResult.textContent = '';
    }
});

export {
    loadTowns,
    isMatching
};
