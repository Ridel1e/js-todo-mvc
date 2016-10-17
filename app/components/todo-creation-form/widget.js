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
    
    const createButton = sandbox.findOne(`.create-button`);
    createButton.click( () => {
      console.log('created');
    });
  }

  function destroy() {

  }
};

export default (ApplicationController) =>
  ApplicationController.register(WIDGET_NAME, widget)