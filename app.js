Ext.application({
    name: 'TaskBoard',

    extend: 'Ext.app.Application',

    requires: [
        'TaskBoard.view.main.Main'
    ],

    mainView: 'TaskBoard.view.main.Main'
});
