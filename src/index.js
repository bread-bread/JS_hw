/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let newArr = [];

    for (let i = 0; i < array.length; i++) {
        newArr.push(fn(array[i], i, array));
    }

    return newArr;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let result = initial || array[0];
    let ndx = 0;

    if (result === array[0]) {
        ndx += 1;
    }

    for (ndx; ndx < array.length; ndx++) {
        result = fn.call(null, result, array[ndx], ndx, array);
    }

    return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    for (let key in obj) {
        if (key === prop) {
            return true
        } 
    }

    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let propArr = [];

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            propArr.push(key.toUpperCase());
        }
    }

    return propArr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {

    let newArr = [];
    
    // определяем начала отсчета по умолчанию
    let start = from || 0,
        finish;

    /* 
    определяем конец отсчета по умолчанию, таким образом чтобы при передаче 0 
    не проходило false и не назначался не верный конец отсчета 
    */
    if (to === 0) {
        finish = 0;
    } else {
        finish = to || array.length;
    }
    /* 
    если начало отсчета меньше 0 и больше либо равно отрицательной длине массива,
    то старт равен длине массива плюс начало отсчета 
    */
    if (from < 0 && from >= -array.length) { 
        start = array.length + from;
    }
    /* 
    если конец отсчета меньше 0, больше либо равно отрицательно длине массива
    и не меньше отрицательно величине начала отсчета, 
    то финиш равен длине массива плюс конец отсчета
    */
    if ((to < 0 && to >= -array.length && to >= -from) || (to < 0 && to >= -array.length && to >= from)) {
        finish = array.length + to;
    }
    /* 
    чтобы функция корректно отрабатывала при передаче slice(arr, 0, -1/-2...)
    */
    if (start === 0 && to < 0) {
        finish = array.length + to;
    }
    /* 
    чтобы не добавляла лишние элементы со значением undefiend 
    если в начало отсчета передано число больше чем длина массива 
    */
    if (to > array.length) {
        finish = array.length;
    }
    /*
    чтобы корректно отрабатывала при передаче начала отсчета меньшего,
    чем отрицательная длина массива.
    */ 
    if (from < 0 && from <= -array.length) {
        for (let i = 0; i < finish; i++) {
            newArr.push(array[i])
        }
    } else {
        for (start; start < finish; start++) {
            newArr.push(array[start]);
        }
    }
    
    return newArr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    })

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};