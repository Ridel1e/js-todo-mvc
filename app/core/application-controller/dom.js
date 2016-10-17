/**
 * Created by ridel1e on 13/10/2016.
 */

import DomManipulator from 'helpers/dom-manipulator';

const dom = (() => {
  return {
    findAll,
    findOne  
  };

  function findAll(selector) {
    return DomManipulator.findAll(selector);
  }

  function findOne(selector) {
    return DomManipulator.findOne(selector);
  }

})();

export default dom;