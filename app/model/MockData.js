Ext.define('TaskBoard.model.MockData', {

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
            name: 'taskStatus',
            type: 'string'
        },
        {
            name: 'taskPriority',
            type: 'string'
        },
        {
            name: 'taskDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
    ]
});
