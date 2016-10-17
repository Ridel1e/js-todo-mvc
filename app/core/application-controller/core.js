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
      loggerService.log(2, 'register(): method got invalid arguments' +
        'first argument must be a "string", second argument must be a "function")');
    }
  }

  /**
   * Start concrete module
   * @param moduleName
   */
  function start(moduleName) {

    if(typeof moduleName !== 'string') {
      loggerService.log(2, 'start(): method got invalid arguments' +
        'argument must be a "string", ');
    }

    moduleData[moduleName].instance =
      moduleData[moduleName].creator(new Sandbox(this, moduleName));

    const instance = moduleData[moduleName].instance;

    try {
      instance.init();
    }
    catch (e){
      loggerService.log(2, `start(): ${e.message}`);
    }
  }

  /**
   * Stop concrete module
   * @param moduleName
   */
  function stop(moduleName) {

    if(typeof moduleName !== 'string') {
      loggerService.log(2, 'stop(): method got invalid arguments' +
        'argument must be a "string", ');
    }

    const module = moduleData[moduleName];

    try {
      module.instance.destroy();
      module.instance = null;
    }
    catch (e) {
      loggerService.log(2, `start(): ${e.message}`);
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
     loggerService.log(2, 'extend', 'first argument must be a "string", ' +
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