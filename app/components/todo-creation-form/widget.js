/**
 * Created by ridel1e on 13/10/2016.
 */

import template from './template';

const WIDGET_NAME = 'todo-creation-form';

const widget = (sandbox) => {

  return {
    init,
    destroy
  };

  function init() {
    sandbox.initializeTemplate(template);
    
    const createButton = sandbox.findOne(`.task-creation-form__create-button`);
    const titleInput = sandbox.findOne(`.task-creation-form__title-input`);

    createButton.click( () => {
      createTask(sandbox.getValue(titleInput));
    });
  }

  function createTask(title) {
    sandbox.notify({
      type: 'SAVE_TASK',
      payload: {
        title,
        completed: false
      }
    })
  }

  function destroy() {

  }
};

export default (ApplicationController) =>
  ApplicationController.register(WIDGET_NAME, widget)