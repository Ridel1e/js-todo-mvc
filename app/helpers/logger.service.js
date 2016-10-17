/**
 * Created by ridel1e on 17/10/2016.
 */

export default (() => {
  return {
    log
  };
  
  function log(type, message) {
    switch (type) {
      case 1:
        console.log(message);
        break;
      case 2:
        console.error(message);
        break;
      case 3:
        console.warn(message);
        break;
    }
  }
})();