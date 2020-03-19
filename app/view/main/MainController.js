Ext.define('TaskBoard.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    listen: {
        store: {
            '#statusesStore': {
                datachanged: function (store) {
                        try {
                            this.getViewModel().set('statusData', store.getRange());
                        } catch (e) {
                            Ext.toast({
                                html: 'Ошибка при загрузке. statusesStore не загружается!',
                                align: 'tr'
                            });
                        }
                    }
                }
        }
    },

    control: {
        '#': {
            afterrender: {
                delay: 300,
                fn: function () {
                    try {
                        Ext.getStore('tasksStore').load();
                    } catch (e) {
                        Ext.toast({
                            html: 'Ошибка при загрузке. tasksStore не загружается!',
                            align: 'tr'
                        });
                    }
                }
            }
        }
    }
});
