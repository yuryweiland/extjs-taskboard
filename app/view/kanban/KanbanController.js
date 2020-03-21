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
            },
            itemclick: function() {
                const statusesStore = Ext.getStore('statusesStore');
                const prioritiesStore = Ext.getStore('prioritiesStore');

                /** Получаем selectedTask из ViewModel-и
                 * (как альтернатива, вторым аргументом у itemclick также является
                 * выбранный элемент, но в качестве эксперимента я взял данные
                 * из MainViewModel
                 */
                const selectedTask = this.getView().up('app-main').getViewModel().get('selectedTask');

                const selectedTaskStatus = statusesStore.getRange()
                    .find((item) => selectedTask.get('taskStatusId') === item.get('id'))
                    .get('title');

                const selectedTaskPriority = prioritiesStore.getRange()
                    .find((item) => selectedTask.get('taskPriorityId') === item.get('id'))
                    .get('title');

                const selectedTaskDate = new Date(selectedTask.get('taskDate')).toLocaleDateString('ru');

                // Выводим всплывающее сообщение в нижней правой части экрана
                // с информацией о выбранной задаче на доске
                Ext.toast({
                    html: '<h3 style="margin:0;">' + selectedTask.get('id') + ': ' + selectedTask.get('taskTitle')+ '</h3>' +
                        '<br><strong>Исполнитель:</strong> ' + selectedTask.get('firstName') + ' ' + selectedTask.get('lastName') +
                        '<br><strong>Статус:</strong> ' + selectedTaskStatus +
                        '<br><strong>Важность:</strong> ' + selectedTaskPriority +
                        '<br><strong>Дата создания задачи:</strong> ' + selectedTaskDate,
                    align: 'br'
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
