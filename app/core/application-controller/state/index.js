/**
 * Created by ridel1e on 18/10/2016.
 */

import core from './core';
import todos from './todos';

core.addReducer('todos', todos);

export default core;