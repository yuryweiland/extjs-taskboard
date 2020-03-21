Ext.define('TaskBoard.view.list.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'list',

    cls: 'tasks-list',

    requires: [
        'TaskBoard.view.list.ListController'
    ],

    title: 'Список задач',

    controller: 'list-controller',

    bind: {
        store: '{tasksStore}'
    },

    columns: [
        {
            text: 'Приоритет',
            dataIndex: 'taskPriorityId',
            renderer: function(value) {
                const store = Ext.getStore('prioritiesStore');
                return store.getRange()
                    .find((item) => item.get('id') === value)
                    .get('title');
            }
        }, {
            text: '№ тикета',
            dataIndex: 'id',
            width: 80,
        }, {
            text: 'Имя',
            dataIndex: 'firstName',
            flex: 0.5
        }, {
            text: 'Фамилия',
            dataIndex: 'lastName',
            flex: 0.5
        }, {
            text: 'Наименование задачи',
            dataIndex: 'taskTitle',
            flex: 1
        }, {
            text: 'Статус',
            dataIndex: 'taskStatusId',
            width: 100,
            renderer: function(value) {
                const store = Ext.getStore('statusesStore');
                return store.getRange()
                    .find((item) => item.get('id') === value)
                    .get('title');
            }
        }, {
            text: 'Дата создания',
            dataIndex: 'taskDate',
            width: 140,
            renderer: function(value) {
                return new Date(value).toLocaleDateString("ru");
            }
        }
    ],
    viewConfig: {
        getRowClass: function(record) {
            const taskPriorityId = record.get('taskPriorityId');
            return 'row-priority-' + taskPriorityId;
        }
    },
});
