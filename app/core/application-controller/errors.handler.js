/**
 * Created by ridel1e on 17/10/2016.
 */

import loggerService from 'helpers/logger.service';

export default ((debug) => {
  if(debug) {
    window.addEventListener('error', (err) => {
      throw err;
    });
  }
  else {
    window.addEventListener('error', (err) => {
      loggerService.log(2, `${err.message}\n${err.stack}`);
    });
  }
})();

