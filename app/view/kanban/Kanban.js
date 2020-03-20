Ext.define('TaskBoard.view.kanban.Kanban', {
    extend: 'Ext.panel.Panel',
    xtype: 'kanban',

    requires: [
        'TaskBoard.view.kanban.KanbanController',
    ],

    title: 'Доска Kanban',

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
        console.log('data', data);
        this.fireEvent('onupdatekanbanstate', this, data);
    }


});
