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
 * @param format
 */
function generateRandomDate(
    start = new Date(0),
    end = new Date(),
    format = 'string') {

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getDate()) || isNaN(endDate.getDate())) {
        throw new Error('Формат даты некорректен');
    }

    const result = new Date(random(startDate.getTime(), endDate.getTime()));

    return format === 'string' ? result.toISOString() : result;
}

/**
 * Генерация мок-данных для тестового задания
 */
function generateTaskBoardData() {
    const firstNames = ['Иван', 'Герман', 'Михаил', 'Сергей', 'Пётр'];
    const lastNames = ['Иванов', 'Петров', 'Сидоров', 'Стэтхем', 'Харди'];
    const taskStatuses = ['PLAN', 'IN PROGRESS', 'TESTING', 'DONE'];
    const taskPriorities = ['MUST', 'SHOULD', 'COULD'];
    const minItems = 5;
    const maxItems = 10;
    let idCounter = 0;

    let tasks = [];

    for (let i = 0; i < random(minItems, maxItems); i++) {
        tasks[i] = {
            id: 'TSK-' + ++idCounter,
            firstName: firstNames[random(0, firstNames.length - 1)],
            lastName: lastNames[random(0, lastNames.length - 1)],
            taskStatus: taskStatuses[random(0, taskStatuses.length - 1)],
            taskPriority: taskPriorities[random(0, taskPriorities.length - 1)],
            taskDate: +generateRandomDate()
        };
    }

    return tasks;
}

console.log(JSON.stringify(generateTaskBoardData()));