Ext.define('TaskBoard.view.kanban.Kanban', {
    extend: 'Ext.grid.Panel',
    xtype: 'kanban',

    requires: [
        'TaskBoard.view.kanban.KanbanController',
    ],

    title: 'Доска Kanban',

    controller: 'kanban-controller',

    viewModel: 'main',

    store: {
        // type: 'mockDataStore'
        bind: {
            type: '{mockDataStore}'
        }
    },

    // bind: {
    //     store: '{mockDataStore}'
    // },

    columns: [
        { text: 'Имя',  dataIndex: 'firstName' },
        { text: 'Фамилия', dataIndex: 'lastName', flex: 1 }
    ]
});
