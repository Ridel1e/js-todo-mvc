/**
 * Created by ridel1e on 13/10/2016.
 */

import InvalidArgumentsError from 'helpers/invalid-argument.error.js';  
  
class Sandbox {
  constructor(applicationController, moduleSelector) {
    this.applicationController = applicationController;
    this.container =
      applicationController.dom.findOne(`#${moduleSelector}`);
  }
  
  findOne(selector) {
    return this.container.findOne(selector);
  }
  
  findAll(selector) {
    return this.container.findAll(selector);
  }

  initializeTemplate(html) {
    this.container.html(html);
  }

  // events
  click(element, callback) {
    if(element.click instanceof Function) {
      element.click(callback);
    }
    else {
      throw new InvalidArgumentsError('click():', 'first argument should be a DOM Object')
    }
  };
}



export default Sandbox;