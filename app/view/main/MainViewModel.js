Ext.define('TaskBoard.view.main.MainViewModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'TaskBoard.model.MockData'
    ],

    data: {
        selectedTask: null,
        statusData: []
    },
    stores: {
        mockDataStore: {
            autoLoad: false,
            pageSize: 0,
            storeId: 'mockDataStore',
            model: 'TaskBoard.model.MockData',
            proxy: {
                type: 'ajax',
                url: 'api/mock-data',
                reader: {
                    type: 'json'
                },
            }
        }
    }
});