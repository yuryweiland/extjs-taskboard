/**
 * Дата-сет
 * @type {string[]}
 */
const firstNames = ['Иван', 'Герман', 'Михаил', 'Сергей', 'Пётр'];
const lastNames = ['Иванов', 'Петров', 'Сидоров', 'Стэтхем', 'Харди'];
const taskTitles = ['Неисправность сервера', 'Новый дизайн сайта', 'Рефакторинг старого кода', 'Сделайте пожалуйста что-нибудь!'];
const taskStatuses = ['PLAN', 'IN PROGRESS', 'TESTING', 'DONE'];
const taskPriorities = ['MUST', 'SHOULD', 'COULD'];

/**
 * Возвращаем случайное число в промежутке от min до max
 * @param min
 * @param max
 */
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Генерируем случайную дату
 * @param start
 * @param end
 */
function generateRandomDate(start = new Date(0), end = new Date()) {

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getDate()) || isNaN(endDate.getDate())) {
        throw new Error('Формат даты некорректен');
    }

    const result = new Date(random(startDate.getTime(), endDate.getTime()));

    return result.toISOString();
}

/**
 * Генерация мок-данных для тестового задания
 */
function generateTaskBoardData() {
    const minItems = 10;
    const maxItems = 12;

    let tasks = [];

    for (let i = 0; i < random(minItems, maxItems); i++) {
        tasks[i] = {
            id: 'TSK-' + ++i,
            firstName: firstNames[random(0, firstNames.length - 1)],
            lastName: lastNames[random(0, lastNames.length - 1)],
            taskTitle: taskTitles[random(0, taskTitles.length - 1)],
            taskStatusId: taskStatuses.indexOf(random(0, taskStatuses.length - 1)) + 2,
            taskPriorityId: taskPriorities.indexOf(random(0, taskPriorities.length - 1)) + 2,
            taskDate: generateRandomDate()
        };
    }

    return JSON.stringify(tasks);
}

function transformStringsToObjectsArray(stringArray) {
    return JSON.stringify(
        stringArray.map((string, index) => {
            return {
                title: string,
                id: index + 1
            }
        })
    )
}

console.log('TASKS:');
console.log(generateTaskBoardData());
console.log('STATUSES:');
console.log(transformStringsToObjectsArray(taskStatuses));
console.log('PRIORITIES:');
console.log(transformStringsToObjectsArray(taskPriorities));