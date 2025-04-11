export default class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push({ task, completed: false });
    }

    completeTask(taskIndex) {
        if (this.tasks[taskIndex]) {
            this.tasks[taskIndex].completed = true;
        }
    }

    listTasks() {
        console.log('Tasks:');
        this.tasks.forEach((task, index) => {
            const status = task.completed ? '✓' : ' ';
            console.log(`${index + 1}. [${status}] ${task.task}`);
        });
    }
}