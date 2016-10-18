/**
 * Created by ridel1e on 12/10/2016.
 */

import template from './template';

const WIDGET_NAME = 'todo-filter';

const widget = (sandbox) => {

  const componentState = {};

  return {
    init,
    destroy
  };
  
  function init() {
    sandbox.initializeTemplate(template);
  }
  
  function destroy() {

  }
  
};

export default (applicationController) => 
  applicationController.register(WIDGET_NAME, widget);
