Ext.define('TaskBoard.view.list.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'list',

    requires: [
        'TaskBoard.view.list.ListController'
    ],

    title: 'Список задач',

    controller: 'list-controller',

    bind: {
        store: '{tasksStore}'
    },

    columns: [
        { text: '№ тикета',  dataIndex: 'id'},
        { text: 'Имя', dataIndex: 'firstName', flex: 1 },
        { text: 'Фамилия', dataIndex: 'lastName', flex: 1 },
        { text: 'Наименование задачи', dataIndex: 'taskTitle', flex: 1 },
        { text: 'Статус', dataIndex: 'taskStatusId', flex: 1 },
        { text: 'Приоритет', dataIndex: 'taskPriorityId', flex: 1 },
        { text: 'Дата создания', dataIndex: 'taskDate', flex: 1 }
    ]
});
