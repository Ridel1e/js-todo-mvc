/**
 * Created by ridel1e on 13/10/2016.
 */

import DomElementDecorator from './dom-element.decorator.js';

const DomManipulator = (() => {

  var documentElement = new DomElementDecorator(document);
  
  return {
    findAll,
    findOne
  };

  /**
   * create new dom element
   * @param element
   * @returns {DomElementDecorator}
   */
  function create(element) {
    return new DomElementDecorator(element)
  }

  /**
   * Кeturns one relevanting element for this selector
   * @param selector
   * @returns {DomElementDecorator}
   */
  function findOne(selector) {
    return documentElement.findOne(selector);
  }

  /**
   * Returns all relevanting elements for this selector
   * @param selector
   * @returns {Array}
   */
  function findAll(selector) {
    return documentElement.findAll(selector);
  }
})();

export default DomManipulator