/**
 * Created by ridel1e on 17/10/2016.
 */

import loggerService from 'helpers/logger.service';

export default ((debug) => {
    window.onerror = (msg, url, line, col, error) => {
      if(!debug) {
        loggerService.log(2, `${error.message}\n${error.stack}`);
        return true;
      }
      else {
        throw error;  
      }
    };
});

