import fs from "fs";

const todosPath = "./app/todo/todos.json";

type Todo = {
    id: number;
    task: string;
};

function getTodos(): Todo[] {
    if (!fs.existsSync(todosPath)) {
        fs.writeFileSync(todosPath, "[]");
        return [];
    }

    const data = fs.readFileSync(todosPath);
    return JSON.parse(data.toString()) as Todo[];
}

function listTodos(): void {
    const todos: Todo[] = getTodos();
    if (todos.length === 0) {
        console.log("No todos found");
        return;
    }

    console.log("Your todos:");
    for (const todo of todos) {
        console.log(`${todo.id}: ${todo.task}`);
    }
}

function saveTodos(todos: Todo[]): void {
    fs.writeFileSync(todosPath, JSON.stringify(todos));
}

function removeToDo(id: number): void {
    const todos: Todo[] = getTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
        console.log(`Todo ${id} not found`);
        return;
    }

    const removedTodo = todos.splice(index, 1)[0];
    console.log(`Removed todo ${removedTodo.id}: ${removedTodo.task}`);
    saveTodos(todos);
}

function addToDo(task: string): void {
    if (task === undefined) {
        console.log("No task provided");
        return;
    }
    const todos: Todo[] = getTodos();
    const id = todos.length > 0 ? todos[todos.length-1].id + 1 : 1;
    todos.push({ id, task });
    saveTodos(todos);
    console.log(`Added todo ${id}: ${task}`);
}

function cli(): void {
    const subcommand = process.argv[2];
    const options = process.argv.slice(3);

    switch (subcommand) {
        case "--help":
            console.log("todo add TASK      add todo");
            console.log("todo done ID       remove todo");
            console.log("todo list          list todos");
            break;
        case "add":
            if (options.length === 1) {
                addToDo(options[0]);
            } else {
                console.log("Invalid number of options");
            }
            break;
        case "done":
            if (options.length === 1) {
                const id = parseInt(options[0]);
                if (isNaN(id)) {
                    console.log("Option must be a number for subcommand 'done'");
                } else {
                    removeToDo(id);
                }
            } else {
                console.log("Invalid number of options for subcommand 'done'");
            }
            break;
        case "list":
            if (options.length === 0) {
                listTodos();
            } else {
                console.log("Invalid number of options for subcommand 'list'");
            }
            break;
        default:
            console.log("Invalid subcommand");
    }
}

cli();