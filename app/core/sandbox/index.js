/**
 * Created by ridel1e on 13/10/2016.
 */

class Sandbox {
  constructor(applicationController, moduleSelector) {
    this.applicationController = applicationController;
    this.container =
      applicationController.dom.findOne(`#${moduleSelector}`);
  }

  findOne(selector) {
    return this.container.findOne(selector);
  }
  
  initializeTemplate(html) {
    this.container.html(html);
  }
}



export default Sandbox;