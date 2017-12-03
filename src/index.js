/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
    let newDiv = document.createElement('div');

    newDiv.innerText = text;
    
    return newDiv;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
    let link = document.createElement('a');

    link.setAttribute('href', hrefValue);

    return link;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
    where.insertBefore(what, where.firstChild);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let length = where.children.length,
        childrens = where.children,
        arr = [];

    for (let i = 0; i < length; i++) {
        if (childrens[i].nextElementSibling && childrens[i].nextElementSibling.tagName === 'P') {
            arr.push(where.children[i]);
        }
    }

    return arr;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var result = [];

    for (var i = 0; i < where.children.length; i++) {
        result.push(where.children[i].innerText);
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    let nodes = where.childNodes,
        len = nodes.length;

    for (let i = 0; i < len; i++) {
        if (nodes[i] && nodes[i].nodeType === 3) {
            nodes[i].remove(nodes[i]);
        }
    }
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    let nodes = where.childNodes,
        len = nodes.length;

    for (let i = 0; i < len; i++) {
        if (nodes[i] && nodes[i].nodeType === 3) {
            where.removeChild(nodes[i])
            i--;
        } else if (nodes[i] && nodes[i].nodeType === 1) {
            deleteTextNodesRecursive(nodes[i])
        }
    }
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
    let DOMStats = {},
        textCounter = 0,
        allTagsArr = [],
        allClassesArr = [];

    function searchText (where) {
        let nodes = where.childNodes;
        
        // перебираем все переданные узлы 
        for (let i = 0; i < nodes.length; i++) {
            // если узел существует и является текстовым увеличивыаем счетчик
            if (nodes[i] && nodes[i].nodeType === 3) {
                textCounter++;
            // если узел является элементом углубляемся
            } else if (nodes[i] && nodes[i].nodeType === 1) {
                allTagsArr.push(nodes[i].tagName);
                if (nodes[i].getAttribute('class')) {
                    allClassesArr.push(nodes[i].className.split(' '));
                }
                searchText(nodes[i])
            }
        }
    }
    searchText(root);

    function createObjStats (arr, flag) {
        let finalArr = [],
            objStats = {};

        if (flag) {
            arr = arr.join().split(',');
        }

        arr.sort();
        arr.forEach(function(item, i, array) {
            if (array[i + 1] !== item || !array[i + 1]) {
                finalArr.push(item);
            }
        })
        finalArr.forEach(function(item) {
            if (flag) {
                objStats[item] = root.querySelectorAll('.' + item).length;
            } else {
                objStats[item] = root.querySelectorAll(item).length;
            }
        })

        return objStats;
        
    }

    DOMStats.tags = createObjStats(allTagsArr, false);
    DOMStats.classes = createObjStats(allClassesArr, true);
    DOMStats.texts = textCounter;

    return DOMStats;
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объек с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {
    let observer = new MutationObserver(mutationObjectCallback),
        objArg = {
            type: 'str',
            nodes: []
        };

    function mutationObjectCallback(mutRecList) {

        mutRecList.forEach(function(mutRec) {

            if (mutRec.addedNodes.length) {
                objArg.type = 'insert';
                for (let i = 0; i < mutRec.addedNodes.length; i++) {
                    objArg.nodes.push(mutRec.addedNodes[i].nodeName);
                }
            } else if (mutRec.removedNodes.length) {
                objArg.type = 'remove';
                for (let i = 0; i < mutRec.removedNodes.length; i++) {
                    objArg.nodes.push(mutRec.removedNodes[i].nodeName);
                }
            }
        })
        fn(objArg);
    }

    observer.observe(where, {
        subtree: true,
        childList: true
    });

}

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};