/**
 * Created by ridel1e on 13/10/2016.
 */

import InvalidArgumentsError from './../invalid-argument.error.js';

class DomElementDecorator {

  /**
   * class constructor
   * @param element
   */
  constructor(element) {
    if(element instanceof HTMLElement || element instanceof HTMLDocument) {
      this._element = element;
    }
    else {
      throw new InvalidArgumentsError('constructor', 'argument must be a "HTMLElement" or a "HTMLDocument"');
    }
  }

  // css class manipulations

  /**
   * Check element
   * @param className
   * @returns {boolean}
   */
  hasClass(className) {
    if(typeof className === 'string') {
      return this._element.className.indexOf(className) !== -1
    }
    else {
      throw new InvalidArgumentsError('hasClass', 'argument must be a "string"');
    }
  }

  /**
   * Add css class to element
   * @param className
   */
  addClass(className) {
    if(typeof className === 'string') {
      this._element.className += ` ${className}`
    }
    else {
      throw new InvalidArgumentsError('addClass', 'argument must be a "string"');
    }
  }

  /**
   * Remove css class from element
   * @param className
   */
  removeClass(className) {
    if(typeof className === 'string') {
      this._element.className = this._element.className.replace(` ${className}`, '');
    }
    else {
      throw new InvalidArgumentsError('removeClass', 'argument must be a "string"');
    }
  }

  // events

  /**
   * add click event handler to element
   * @param callback
   */
  click(callback) {
    if(callback instanceof Function) {
      this.on('click', callback);
    }
    else {
      throw new InvalidArgumentsError('click', 'argument must be a "function"');
    }
  }

  /**
   * add mouseenter and mouseleave event handlers to element
   * @param mouseEnterCallback
   * @param mouseLeaveCallback
   */
  hover(mouseEnterCallback, mouseLeaveCallback) {
    if(mouseEnterCallback instanceof Function && mouseLeaveCallback instanceof Function) {
      this.on('mouseenter', mouseEnterCallback);
      this.on('mouseleave', mouseLeaveCallback);
    }
    else {
      throw new InvalidArgumentsError('hover', 'first and second arguments must be a "function"');
    }
  }

  /**
   * add event handler to element
   * @param eventName
   * @param callback
   */
  on(eventName, callback) {
    if(typeof eventName === 'string' && callback instanceof Function) {
      this._element.addEventListener(eventName, callback);
    }
    else {
      throw new InvalidArgumentsError('on', 'first argument must be a "string", ' +
        'second arguments must be a "function"');
    }
  }

  // html

  /**
   * change element inner html
   * @param template
   */
  html(template) {
    if(typeof template === 'string') {
      this._element.innerHTML = template;
    }
    else {
      throw new InvalidArgumentsError('html', 'argument must be a "string"');
    }
  }
  
  // dom

  /**
   * Returns one relevanting element for this selector
   * @param selector
   * @returns {DomElementDecorator}
   */
  findOne(selector) {
    if(typeof selector === 'string') {
      return new DomElementDecorator(this._element.querySelector(selector));
    }
    else {
      throw new InvalidArgumentsError('findOne', 'argument must be a "string"')
    }
  }

  /**
   * Returns all relevanting elements for this selector
   * @param selector
   * @returns {Array}
   */
  findAll(selector) {
    if(typeof selector === 'string') {
      return Array.prototype
        .map.call(this._element.querySelectorAll(selector), (element) =>
          new DomElementDecorator(element))
    }
    else {
      throw new InvalidArgumentsError('findAll', 'argument must be a "string"')
    }
  }
}

export default DomElementDecorator;