Ext.define('TaskBoard.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',

        'TaskBoard.view.main.MainController',
        'TaskBoard.view.main.MainViewModel',
        'TaskBoard.view.kanban.Kanban',
        'TaskBoard.view.list.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            text: 'TestCompany',
            flex: 0
        },
        iconCls: 'fa-circle'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: '0 0 0 6px'
    },

    items: [{
        title: 'Доска Kanban',
        iconCls: 'fa-clipboard',
        items: [{
            xtype: 'kanban'
        }]
    }, {
        title: 'Список задач',
        iconCls: 'fa-list',
        items: [{
            xtype: 'list'
        }]
    }]
});
