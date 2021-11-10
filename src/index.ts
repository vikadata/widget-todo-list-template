import { initializeWidget } from '@vikadata/widget-sdk';
import { TodoList } from './todo_list';

initializeWidget(TodoList, process.env.WIDGET_PACKAGE_ID!);
