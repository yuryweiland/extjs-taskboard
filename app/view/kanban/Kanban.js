Ext.define('TaskBoard.view.kanban.Kanban', {
    extend: 'Ext.panel.Panel',
    xtype: 'kanban',

    requires: [
        'TaskBoard.view.kanban.KanbanController',
    ],

    header: {
        title: 'Доска Kanban',
        cls: 'kanban-panel-header',
    },

    controller: 'kanban-controller',

    border: true,
    scrollable: 'horizontal',
    bodyPadding: 10,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    height: '100%',
    bind: {
        myStatus: '{statusData}'
    },
    setMyStatus: function (data) {
        // Вызываем событие обновления канбан-доски
        this.fireEvent('onupdatekanbanstate', this, data);
    }
});
