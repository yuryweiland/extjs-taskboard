Ext.define('TaskBoard.view.kanban.KanbanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.kanban-controller',

    requires: [
        'TaskBoard.view.kanban.KanbanGrid',
        'TaskBoard.view.kanban.KanbanDataView'
    ],

    mixins: ['TaskBoard.mixins.StatusRender'],

    control: {
        '#': {
            'onupdatekanbanstate': 'updateKanbanState'
        },
        'data-view-kanban dataview': {
            viewready: function (view) {
                view.dragZone = new Ext.dd.DragZone(view.getEl(), {
                    getDragData: function (e) {
                        let sourceEl = e.getTarget(view.itemSelector, 10);

                        if (sourceEl) {
                            var d = sourceEl.cloneNode(true);
                            d.id = Ext.id();

                            return {
                                ddel: d,
                                sourceEl: sourceEl,
                                repairXY: Ext.fly(sourceEl).getXY(),
                                sourceStore: view.store,
                                draggedRecord: view.getRecord(sourceEl)
                            }
                        }
                    },
                    getRepairXY: function () {
                        return this.dragData.repairXY;
                    }
                });
                view.dropZone = new Ext.dd.DropZone(view.getEl(), {
                    getTargetFromEvent: function () {
                        return view.getEl();
                    },
                    onNodeDrop: function (target, dd, e, data) {
                        let currentStateId = data.draggedRecord.get('taskStatusId'),
                            sourceStateId = null;

                        try {
                            sourceStateId = Ext.getCmp(target.getAttribute('id'))
                                .lookupViewModel()
                                .get('taskStatusId');
                        } catch (e) {
                        }

                        if (sourceStateId !== null && currentStateId !== sourceStateId) {
                            let stateData = Ext.StoreManager
                                .get('statusStore')
                                .getById(sourceStateId);

                            data.draggedRecord.set('taskStatusId', sourceStateId);
                            data.draggedRecord.set(
                                'taskStatusId',
                                Ext.copyTo({}, stateData.getData(), 'id,sort,name'));
                            data.draggedRecord.commit();
                        }
                    }
                });
            }
        }
    },

    'updateKanbanState': function (panel, data) {


        console.log(panel.items);

        for (var i = 0, l = Ext.max([data.length, panel.items.length]); i < l; i++) {


            console.log('updateKanbanState', panel.items.getAt(i), data[i]);


            if (panel.items.getAt(i) !== undefined && data[i] !== undefined) {

                let vm = panel.items.getAt(i).getViewModel();

                console.log('VM:', vm);

                vm.set('title', data[i].get('title'));
                vm.set('statusId', data[i].get('id'));

            } else if (panel.items.getAt(i) === undefined && data[i] !== undefined) {

                panel.add({
                    xtype: 'data-view-kanban',
                    viewModel: {
                        data: {
                            title: data[i].get('title'),
                            statusId: data[i].get('id')
                        },
                        stores: {
                            localTaskStore: {
                                source: 'tasksStore',
                                filters: {
                                    property: 'taskStatusId',
                                    operator: '=',
                                    value: '{statusId}'
                                },
                                sorters: [
                                    {
                                        property: 'firstName',
                                        direction: 'ASC'
                                    },
                                    {
                                        property: 'lastName',
                                        direction: 'ASC'
                                    },
                                    {
                                        property: 'taskPriorityId',
                                        direction: 'ASC'
                                    }
                                ]
                            }
                        }
                    },
                    bind: {
                        title: '{title}'
                    }
                });

            } else if (panel.items.getAt(i) !== undefined) {

                panel.remove(panel.items.getAt(i), true);

            }
        }
    }




});
