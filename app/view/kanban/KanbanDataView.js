Ext.define('TaskBoard.view.kanban.KanbanDataView', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.data-view-kanban',

    flex: 1,
    margin: '0 5',
    border: true,
    minWidth: 300,
    layout: 'fit',

    viewModel: 'main',

    items: {
        xtype: 'dataview',
        trackOver: true,
        cls: 'data-view-kanban',
        itemSelector: 'div.task-item',
        overItemCls: 'x-grid-item-over',
        selectedItemCls: 'x-grid-item-selected',
        scrollable: 'vertical',
        tpl: new Ext.XTemplate(
            '<tpl for=".">',
            '<div style="padding-left:16px; box-shadow:10px 0 0 red inset;" class="task-item">',
            '<h3>{id}: {taskTitle}</h3>',
            '<div class="x-title-text-default x-title-item">{firstName} {lastName}</div>',
            '</div>',
            '</tpl>'),
        emptyText: new Ext.XTemplate(
            '<span>{text}</span>')
            .apply({
                text: 'Заданий в этом статусе нет'
            }),
        bind: {
            selection: '{selectedTask}',
            store: '{filteredTasksStore}'
        }
    }

});
