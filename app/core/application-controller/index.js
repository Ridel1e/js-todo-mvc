/**
 * Created by ridel1e on 13/10/2016.
 */

import Core from './core.js';
import dom from './dom';
import errorsHandler from './errors.handler';

// errors handler
errorsHandler(Core.debug);

// extensions
Core.extend('dom', dom);


export default Core;