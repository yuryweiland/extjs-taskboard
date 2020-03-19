Ext.define('TaskBoard.view.kanban.KanbanGrid', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.grid-kanban',

    flex: 1,
    margin: '0 5',
    border: true,
    minWidth: 300,
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop'
        },
        listeners: {
            'drop': {
                fn: function (dd, conf) {
                    conf.records[0].set('taskStatusId', this.lookupViewModel().get('taskStatusId'));
                    conf.records[0].commit();
                }
            }
        }
    },
    columns: [
        {
            dataIndex: 'number',
            text: 'Номер',
            width: 110,
            renderer: 'priorityMark'
        },
        {
            dataIndex: 'name',
            text: 'Задача',
            flex: 1
        }
    ]
});
