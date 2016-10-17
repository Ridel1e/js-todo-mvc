/**
 * Created by ridel1e on 13/10/2016.
 */

import DomManipulator from 'helpers/dom-manipulator';

const dom = (() => {
  return {
    findAll,
    findOne  
  };

  /**
   * Returns all relevanting elements for this selector
   * @param selector
   * @returns {*}
   */
  function findAll(selector) {
    return DomManipulator.findAll(selector);
  }

  /**
   * Returns one relevanting element for this selector
   * @param selector
   * @returns {*}
   */
  function findOne(selector) {
    return DomManipulator.findOne(selector);
  }

})();

export default dom;