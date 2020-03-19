Ext.define('TaskBoard.model.MockData', {

    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id',
            type: 'string'
        },
        {
            name: 'firstName',
            type: 'string'
        },
        {
            name: 'lastName',
            type: 'string'
        },
        {
            name: 'taskStatus',
            type: 'string'
        },
        {
            name: 'taskPriority',
            type: 'string'
        },
        {
            name: 'taskDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        }
    ],

    // fields: [
    //     {
    //         name: 'state.id',
    //         type: 'number',
    //         mapping : 'state.id'
    //     },
    //     {
    //         name: 'state.id',
    //         type: 'number',
    //         mapping : 'state.id'
    //     },
    //     {
    //         name: 'state.name',
    //         type: 'number',
    //         mapping : 'state.name'
    //     },
    //     {
    //         name: 'priority.id',
    //         type: 'number',
    //         mapping : 'priority.id'
    //     },
    //     {
    //         name: 'priority.color',
    //         type: 'string',
    //         mapping : 'priority.color'
    //     },
    //     {
    //         name: 'priority.sort',
    //         type: 'number',
    //         mapping : 'priority.sort'
    //     },
    //     {
    //         name: 'user.id',
    //         type: 'number',
    //         mapping : 'user.id'
    //     },
    //     {
    //         name: 'user.firstName',
    //         type: 'string',
    //         mapping : 'user.firstName'
    //     },
    //     {
    //         name: 'user.lastName',
    //         type: 'string',
    //         mapping : 'user.lastName'
    //     },
    //     {
    //         name: 'date',
    //         type: 'date',
    //         dateFormat: 'Y-m-d'
    //     }
    // ],

    proxy: {
        type: 'ajax',
        url: 'api/mock-data.js',
        reader: {
            type: 'json',
            // transform: function (data) {
            //     var res = [];
            //     if (data.success !== true && !data.data) {
            //         return res;
            //     }
            //     Ext.Object.each(data.data || {}, function (key, val) {
            //         Ext.Array.each(val || [], function (rec) {
            //             res.push(
            //                 Ext.apply(rec, {
            //                     type: key
            //                 })
            //             );
            //         });
            //     });
            //     return res;
            // }
        }
    }
});
