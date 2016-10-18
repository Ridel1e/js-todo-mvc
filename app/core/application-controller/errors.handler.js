/**
 * Created by ridel1e on 17/10/2016.
 */

import loggerService from 'helpers/logger.service';

export default ((debug) => {
  // if(debug) {
  //   window.onerror = (msg, url, line, col, error) => {
  //     throw error;
  //   };
  // }
  // else {
  //   window.onerror = (msg, url, line, col, error) => {
  //     loggerService.log(2, `${error.message}\n${error.stack}`);
  //     return true;
  //   };
  // }
  window.onerror = (msg, url, line, col, error) => {
    console.log(error);
    return true;
  }
});

