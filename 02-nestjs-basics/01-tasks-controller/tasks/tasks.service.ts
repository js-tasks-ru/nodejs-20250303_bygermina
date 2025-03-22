import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  createTask(task: Task): Task {
    const newTask: Task = {
      id: (this.tasks.length + 1).toString(),
      title: task.title,
      description: task.description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(newTask);

    return this.tasks.at(-1);
  }

  updateTask(id: string, update: Task): Task {
    const task = this.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const newTask = {
      id,
      title: update.title,
      description: update.description,
      status: update.status,
    };

    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex] = newTask;

    return newTask;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    const [deletedTask] = this.tasks.splice(taskIndex, 1);

    return deletedTask;
  }
}
