/**
 * Модель Приоритета (Важности) задач на доске
 * В зависимости от важности, задачи подсвечиваются различным цветом
 * (зеленым, желтым либо красным)
 */
Ext.define('TaskBoard.model.Priority', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'id',
            type: 'number'
        }
    ]
});
