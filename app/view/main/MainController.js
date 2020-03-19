Ext.define('TaskBoard.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    control: {
        '#': {
            afterrender: {
                delay: 300,
                fn: function () {
                    try {
                        Ext.getStore('mockDataStore').load();
                    } catch (e) {
                        Ext.toast({mockDataStore
                            html: 'Ошибка при загрузке. mockDataStore не найдено!',
                            align: 'tr'
                        });
                    }
                }
            }
        }
    }
});
