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
                        setTimeout(() => console.log(111, Ext.getStore('mockDataStore').getRange()), 1000);

                    } catch (e) {
                        Ext.toast({
                            html: 'Ошибка при загрузке. mockDataStore не найдено!',
                            align: 'tr'
                        });
                    }
                }
            }
        }
    }
});
