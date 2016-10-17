/**
 * Created by ridel1e on 17/10/2016.
 */

class InvalidArgumentError {
  constructor(methodName, message) {
    this.name = 'InvalidArgumentError';
    this.message = `${methodName}(): method got invalid arguments: ${message}`;
    this.stack = new Error().stack;
  }
}


export default InvalidArgumentError;