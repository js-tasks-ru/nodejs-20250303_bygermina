import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly notificationService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;

    const user = this.usersService.getUserById(assignedTo);
    if (!user) {
      throw new NotFoundException(`User with id ${assignedTo} not found`);
    }

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    this.notificationService.sendEmail(
      user.email,
      "Новая задача",
      `Вы назначены ответственным за задачу: "${title}"`,
    );

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    const user = this.usersService.getUserById(task.assignedTo);
    if (!user) {
      throw new NotFoundException(`User with id ${task.assignedTo} not found`);
    }

    this.notificationService.sendSMS(
      user.phone,
      `Статус задачи "${task.title}" обновлён на "${updateTaskDto.status}"`,
    );

    Object.assign(task, updateTaskDto);
    return task;
  }
}
