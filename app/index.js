/**
 * Created by ridel1e on 12/10/2016.
 */

import ApplicationController from 'core/application-controller';
import errorHandler from 'helpers/error.handler';

import todoFilterWidget from 'components/todo-filter';
import todoCreationFormWidget from 'components/todo-creation-form';
import todoList from 'components/todo-list';

errorHandler(ApplicationController.debug);

todoCreationFormWidget(ApplicationController);
todoFilterWidget(ApplicationController);
todoList(ApplicationController);


ApplicationController.startAll();


