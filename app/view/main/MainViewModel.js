Ext.define('TaskBoard.view.main.MainViewModel', {

    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    requires: [
        'TaskBoard.model.Task',
        'TaskBoard.model.Status',
        'TaskBoard.model.Priority'
    ],

    data: {
        selectedTask: null,
        statusData: []
    },
    stores: {
        tasksStore: {
            autoLoad: true,
            pageSize: 0,
            storeId: 'tasksStore',
            model: 'TaskBoard.model.Task',
            proxy: {
                type: 'ajax',
                url: 'api/mock-data?tasks',
                reader: {
                    type: 'json',
                    rootProperty: 'tasks'
                },
            }
        },
        statusesStore: {
            autoLoad: true,
            pageSize: 0,
            storeId: 'statusesStore',
            model: 'TaskBoard.model.Status',
            proxy: {
                type: 'ajax',
                url: 'api/mock-data?statuses',
                reader: {
                    type: 'json',
                    rootProperty: 'statuses'
                },
            }
        },
        prioritiesStore: {
            autoLoad: true,
            pageSize: 0,
            storeId: 'prioritiesStore',
            model: 'TaskBoard.model.Priority',
            proxy: {
                type: 'ajax',
                url: 'api/mock-data?priorities',
                reader: {
                    type: 'json',
                    rootProperty: 'priorities'
                },
            }
        }
    }
});
