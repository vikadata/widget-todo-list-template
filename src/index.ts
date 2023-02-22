import { initializeWidget } from '@apitable/widget-sdk';
import { TodoList } from './todo_list';

initializeWidget(TodoList, process.env.WIDGET_PACKAGE_ID!);
