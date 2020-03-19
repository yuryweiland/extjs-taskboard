Ext.define('TaskBoard.model.Task', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'firstName',
            type: 'string'
        },
        {
            name: 'lastName',
            type: 'string'
        },
        {
            name: 'taskTitle',
            type: 'string'
        },
        {
            name: 'taskStatusId',
            type: 'number'
        },
        {
            name: 'taskPriorityId',
            type: 'number'
        },
        {
            name: 'taskDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
    ]
});
