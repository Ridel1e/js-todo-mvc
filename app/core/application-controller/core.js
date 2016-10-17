/**
 * Created by ridel1e on 13/10/2016.
 */

import Sandbox from 'core/sandbox';
import InvalidArgumentsError from 'helpers/invalid-argument.error.js';

const core = (() => {
  
  const moduleData = {};
  
  return {
    extend,
    register,
    start,
    startAll,
    stop,
    stopAll,
  };

  /**
   * Register module in app
   * @param moduleName
   * @param creator
   */
  function register(moduleName, creator) {
    if(typeof moduleName === 'string' && creator instanceof Function) {
      moduleData[moduleName] = {
        creator,
        instance: null
      }
    }
    else {
        throw new InvalidArgumentsError('register', 'first argument must be a "string", ' +
          'second argument must be a "function"');
    }
  }

  /**
   * Start concrete module
   * @param moduleName
   */
  function start(moduleName) {

    if(typeof moduleName !== 'string') {
      throw new InvalidArgumentsError('start', 'argument must be a "string"');
    }

    moduleData[moduleName].instance = 
      moduleData[moduleName].creator(new Sandbox(this, moduleName));
    
    const instance = moduleData[moduleName].instance;
    
    if(instance.init instanceof Function && instance.destroy instanceof Function) {
      instance.init();
    }
    else {
        throw new Error('start(): module doesn\'t have "init" or "destroy" function ');
    }
  }

  /**
   * Stop concrete module
   * @param moduleName
   */
  function stop(moduleName) {

    if(typeof moduleName !== 'string') {
      throw new InvalidArgumentsError('stop', 'argument must be a "string"');
    }

    const module = moduleData[moduleName];

    if(module.instance instanceof Object) {
      if(module.instance.destroy instanceof Function) {
        moduleData[moduleName].instance.destroy();
        moduleData[moduleName].instance = null;
      }
      else {
        throw new Error('stop(): module does\'t have "destroy method"');
      }
    }
    else {
      throw new Error('stop(): module should be started');
    }
  }

  /**
   * Extend application controller
   * @param extensionName
   * @param extensionObject
   */
  function extend(extensionName, extensionObject) {
    if(typeof extensionName === 'string' && extensionObject instanceof Object) {
      this[extensionName] = extensionObject;
    }
    else {
     throw new InvalidArgumentsError('extend', 'first argument must be a "string", ' +
       'second argument must be an "Object"');
    }
  }
  
  function startAll() {
    Object.keys(moduleData).forEach((moduleName) => this.start(moduleName));
  }
  
  function stopAll() {
    Object.keys(moduleData).forEach((moduleName) => this.stop(moduleName));
  }
})();


export default core;