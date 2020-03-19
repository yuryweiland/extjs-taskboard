Ext.define('TaskBoard.view.list.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'list',

    requires: [
        'TaskBoard.view.list.ListController'
    ],

    title: 'Список задач',

    controller: 'list-controller',

    viewModel: 'main',

    bind: {
        store: '{mockDataStore}'
    },

    columns: [
        { text: '№ тикета',  dataIndex: 'id'},
        { text: 'Имя', dataIndex: 'firstName', flex: 1 },
        { text: 'Фамилия', dataIndex: 'lastName', flex: 1 },
        { text: 'Статус', dataIndex: 'taskStatus', flex: 1 },
        { text: 'Приоритет', dataIndex: 'taskPriority', flex: 1 },
        { text: 'Дата создания', dataIndex: 'taskDate', flex: 1 }
    ]
});
