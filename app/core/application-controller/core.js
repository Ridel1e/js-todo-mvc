/**
 * Created by ridel1e on 13/10/2016.
 */

import Sandbox from 'core/sandbox';
import InvalidArgumentsError from 'helpers/invalid-argument.error.js';
import loggerService from 'helpers/logger.service.js';

const core = (() => {
  
  const moduleData = {};
  const debug = false;
  
  return {
    get debug() {
      return debug;
    },
    extend,
    register,
    start,
    startAll,
    stop,
    stopAll
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
      throw new InvalidArgumentsError('register',
        'first argument must be a "string", second argument must be a "function")');
    }
  }

  /**
   * Start concrete module
   * @param moduleName
   */
  function start(moduleName) {

    if(typeof moduleName === 'string') {

      moduleData[moduleName].instance =
        moduleData[moduleName].creator(new Sandbox(this, moduleName));

      try {
        moduleData[moduleName].instance.init();
      }
      catch (e) {
        loggerService.log(2, `start(): module "${moduleName}" can't be started. ${e.message}`);
      }
    }
    else {
      throw new InvalidArgumentsError('start', 'argument must be a "string"');
    }
  }

  /**
   * Stop concrete module
   * @param moduleName
   */
  function stop(moduleName) {

    if(typeof moduleName === 'string') {
      const module = moduleData[moduleName];
      try {
        module.instance.destroy();
        module.instance = null;
      }
      catch (e) {
        loggerService.log(2, `stop(): module "${moduleName}" can't be stopped. ${e.message}`);
      }
    }
    else {
      throw new InvalidArgumentsError('stop', 'argument must be a "string"');
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
     throw new InvalidArgumentsError('extend', 'first argument must be a "string",' +
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