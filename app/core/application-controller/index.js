/**
 * Created by ridel1e on 13/10/2016.
 */

import Core from './core.js';
import dom from './dom';
import state from './state';

// extensions
Core.extend('dom', dom);
Core.extend('state', state);

export default Core;