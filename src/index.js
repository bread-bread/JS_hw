/* --------| | |---------- */

// /* ДЗ 1 - Функции */

// /*
//  Задание 1:

//  Функция должна принимать один аргумент и возвращать его
//  */
// function returnFirstArgument(arg) {
//     return arg;
// }

// /*
//  Задание 2:

//  Функция должна принимать два аргумента и возвращать сумму переданных значений
//  Значение по умолчанию второго аргумента должно быть 100
//  */
// function defaultParameterValue(a, b) {
//     b = b || 100;
    
//     return a + b;
// }

// /*
//  Задание 3:

//  Функция должна возвращать все переданные в нее аргументы в виде массива
//  Количество переданных аргументов заранее неизвестно
//  */
// function returnArgumentsArray() {
//     let arr = [];

//     for (let i = 0; i<arguments.length; i++) {
//         arr.push(arguments[i]);
//     }
    
//     return arr;
// }

// /*
//  Задание 4:

//  Функция должна принимать другую функцию и возвращать результат вызова переданной функции
//  */
// function returnFnResult(fn) {
//     let func = fn();

//     return func;
// }

// /*
//  Задание 5:

//  Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
//  При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
//  */
// function returnCounter(number) {
//     return function() {
//         number = number || 0;
        
//         return ++number;
//     }
// }

// /*
//  Задание 6 *:

//  Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
//  Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
//  */
// function bindFunction(fn) {
//     var newFunc = fn.bind(null, arguments[1]);

//     for (let i = 2; i<arguments.length; i++) {
//         newFunc = newFunc.bind(null, arguments[i]);
//     }
    
//     return newFunc;
//     // let newFunc = function() {
        
//     //     return fn.apply(null, bArgs);
//     // }

//     // return newFunc;
// }

// export {
//     returnFirstArgument,
//     defaultParameterValue,
//     returnArgumentsArray,
//     returnFnResult,
//     returnCounter,
//     bindFunction
// }

/* --------| || |---------- */

/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    // выбрасываем исключение если array не массив или пустой массив
    if (array.length <= 0 || array instanceof Array === false) {
        throw new Error('empty array');
    }
    // выбрасываем исключение если fn не функция
    if (fn instanceof Function === false) { // можно и через typeof проверить, но решил уже одинаково
        throw new Error('fn is not a function');
    }
    // инициализируем переменную счетчика
    let counter = 0;

    // вызываем fn для каждого элемента array
    for (let i = 0; i < array.length; i++) {

        let answer = fn(array[i]);

        // если fn вернула true, увеличиваем счетчик
        if (answer) {
            counter++;
        }  
    }
    // проверяем все ли элементы в array true
    if (counter === array.length) {
        // если все верно возвращаем true
        return true
    }
    // если нет, то возвращаем false

    return false;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    // выбрасываем исключение если array не массив или пустой массив
    if (array.length <= 0 || array instanceof Array === false) {
        throw new Error('empty array');
    }
    // выбрасываем исключение если fn не функция
    if (fn instanceof Function === false) {
        throw new Error('fn is not a function');
    }
    // вызываем fn для каждого элемента array
    for (let i = 0; i < array.length; i++) {

        let answer = fn(array[i]);

        if (answer) {
            // если хоть один элемент array === true вернем true
            return true
        }
    }
    // если fn не вернула true ни для одного элемента возвращаем false

    return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    // проверяем является ли параметр fn функцией
    if (fn instanceof Function === false) { 
        throw new Error('fn is not a function');
    }
    // создаем пустой массив, если поймаем исключение запишем его туда, если нет вернем пустой
    let arr = [];

    // вызываем fn для каждого переданного аргумента
    for (let i = 1; i < arguments.length; i++) {
        // начинаем ловить исключения
        try {
            fn(arguments[i]);
        } catch (e) {
            // если поймали, в массив записали YO
            arr.push(arguments[i]);
        }
    }
    // вернем полученный массив

    return arr;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number) {
    // если аргумент не передан устанавливаем number по умолчанию 0
    number = number || 0;
    // выбрасываем исключение если number не число
    if (typeof number !== 'number') {
        throw new Error ('number is not a number')
    }
    // возвращаем объект с методами

    return {
        sum: function() {
            let result = number;

            for (let i = 0; i < arguments.length; i++) {
                result = result + arguments[i];
            }

            return result;
        },
        dif: function() {
            let result = number;

            for (let i = 0; i < arguments.length; i++) {
                result = result - arguments[i];
            }

            return result;
        },
        div: function() {
            let result = number;

            for (let i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error('division by 0');
                }
                result = result / arguments[i];
            }

            return result;
        },
        mul: function() {
            let result = number;

            for (let i = 0; i < arguments.length; i++) {
                result = result * arguments[i];
            }

            return result;
        }
    }
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};