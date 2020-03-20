/**
 * Модель Статуса задачи на канбан-доски
 * Необходим для генерации колонок самой доски
 */
Ext.define('TaskBoard.model.Status', {

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
