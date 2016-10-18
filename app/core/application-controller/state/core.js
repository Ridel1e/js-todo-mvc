/**
 * Created by ridel1e on 18/10/2016.
 */

import InvalidArgumentsError from 'helpers/invalid-argument.error.js';

export default (() => {

  const state = {};
  const reducers = {};
  const listeners = {};

  return {
    addReducer,
    listen,
    notify
  };

  /**
   * 
   * @param name
   * @param reducer
   */
  function addReducer(name, reducer) {
    if(typeof name === 'string' && reducer instanceof Object) {
      reducers[name] = reducer;
      state[name] = reducer(state[name], {});
      listeners[name] = [];
    }
    else {
      throw new InvalidArgumentsError('addReducer', 'first argument must be an Object' +
        'second argument must be a string');
    }
  }

  /**
   * 
   * @param action
   */
  function notify(action) {
    if(action instanceof Object) {
       Object.keys(reducers).forEach((name) => {
         state[name] = reducers[name](state[name], action);
         listeners[name].forEach(listener => listener(state[name]));
       })
    }
    else {
      throw new InvalidArgumentsError('notify', 'argument must be an Object')
    }
  }

  /**
   *
   * @param name
   * @param callback
   * @returns {Function}
   */
  function listen(name, callback) {
    if(typeof name === 'string' && callback instanceof Function) {
      listeners[name].push(callback);
    }
    else {
      throw new InvalidArgumentsError('getFromState', 'first argument must be a string,' +
        ' second argument must be a Function')
    }
  }
})();