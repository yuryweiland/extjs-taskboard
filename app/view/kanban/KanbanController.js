Ext.define('TaskBoard.view.kanban.KanbanController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.kanban-controller',

    requires: [
        'TaskBoard.view.kanban.KanbanDataView'
    ],

    control: {
        '#': {
            'onupdatekanbanstate': 'updateKanbanState'
        },
        'data-view-kanban dataview': {
            viewready: function (view) {

                // Объявляем dragZone, чтобы был активен drag'n'drop
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
                        const elementStatusId = Ext.getCmp(target.getAttribute('id')).lookupViewModel().get('statusId');

                        // Текущий taskStatusId
                        let currentTaskStatusId = data.draggedRecord.get('taskStatusId');

                        // Обновлённый taskStatusId (берем статус колонки,
                        // в которой произошло событие drop)
                        let changedTaskStatusId = elementStatusId ? elementStatusId : null;

                        // Если поменялся статус таска
                        if (changedTaskStatusId !== null && currentTaskStatusId !== changedTaskStatusId) {

                            // Устанавливаем новый taskStatusId для элемента
                            data.draggedRecord.set('taskStatusId', changedTaskStatusId);

                            data.draggedRecord.commit();
                        }
                    }
                });
            }
        }
    },

    'updateKanbanState': function (panel, data) {
        // Обновление канбан-панели - бегаем циклом по всем элементам (таскам)
        for (var i = 0, l = Ext.max([data.length, panel.items.length]); i < l; i++) {

            if (panel.items.getAt(i) !== undefined && data[i] !== undefined) {
                let vm = panel.items.getAt(i).getViewModel();

                vm.set('title', data[i].get('title'));
                vm.set('statusId', data[i].get('id'));

            } else if (panel.items.getAt(i) === undefined && data[i] !== undefined) {

                // Добавляем панель канбан-доски,
                // и устанавливаем filteredTaskStore и его фильтрацию
                panel.add({
                    xtype: 'data-view-kanban',
                    viewModel: {
                        data: {
                            title: data[i].get('title'),
                            statusId: data[i].get('id')
                        },
                        stores: {
                            filteredTasksStore: {
                                source: 'tasksStore',
                                filters: {
                                    property: 'taskStatusId',
                                    operator: '=',
                                    value: '{statusId}'
                                },
                                remoteSort: false,
                                sorters: [
                                    {
                                        property: 'taskPriorityId',
                                        direction: 'DESC'
                                    },
                                    {
                                        property: 'lastName',
                                        direction: 'ASC'
                                    },
                                    {
                                        property: 'firstName',
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

                // Удаляем элемент из колонки канбан-доски
                panel.remove(panel.items.getAt(i), true);
            }
        }
    }

});
