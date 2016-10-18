/**
 * Created by ridel1e on 18/10/2016.
 */

import template from './template';

const WIDGET_NAME = 'todo-list';

const widget = (sandbox) => {
  return {
    init,
    destroy
  };

  function init() {
    sandbox.initializeTemplate(template);
    
    const taskList = sandbox.findOne('.task-list');
    
    sandbox.listen('todos', (todos) => {
      addTodo(todos[todos.length - 1]);
    })
  }

  function destroy() {

  }

  function addTodo(todos) {
    
  }
};

export default (ApplicationController) =>
  ApplicationController.register(WIDGET_NAME, widget)