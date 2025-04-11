import TodoList from './todo.js';

const myTodoList = new TodoList();

myTodoList.addTask('Learn JavaScript modules');
myTodoList.addTask('Practice coding');
myTodoList.addTask('Take a break');

myTodoList.completeTask(0);
myTodoList.completeTask(1);

myTodoList.listTasks();