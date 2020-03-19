/**
 * Возвращаем случайное число в промежутке от min до max
 * @param min
 * @param max
 * @return {number}
 */
function random(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min + 1));
}

/**
 * Генерируем случайную дату
 * @param start
 * @param end
 * @param format
 * @return {*}
 */
function generateRandomDate(
    start: string | Date = new Date(0),
    end: string | Date = new Date(),
    format: 'string' | 'date' = 'string'
): string | Date {
    // `as Date` нужен для избежания ошибки typescript, т.к. тайпинга `new Date(string | Date)`
    // не подвезли (а `new Date(string)` и `new Date(Date)` работают отлично)
    const startDate: Date = new Date(start as Date);
    const endDate: Date = new Date(end as Date);

    if (isNaN(startDate.getDate()) || isNaN(endDate.getDate())) {
        throw new Error('Формат даты некорректен');
    }

    const result: Date = new Date(random(startDate.getTime(), endDate.getTime()));

    return format === 'string' ? result.toISOString() : result;
}

/**
 * Генерация мок-данных для тестового задания
 */
function generateTaskBoardData() {
    const firstNames: string[] = ['Иван', 'Герман', 'Михаил', 'Сергей', 'Пётр'];
    const lastNames: string[] = ['Иванов', 'Петров', 'Сидоров', 'Стэтхем', 'Харди'];
    const taskStatuses: string[] = ['PLAN', 'IN PROGRESS', 'TESTING', 'DONE'];
    const taskPriorities: string[] = ['MUST', 'SHOULD', 'COULD'];
    const minItems: number = 5;
    const maxItems: number = 10;
    let idCounter: number = 0;

    for (let i: number = 0; i < random(minItems, maxItems); i++) {
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

generateTaskBoardData();