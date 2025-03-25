import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query("status") status?: TaskStatus,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
  ) {
    if (status && !Object.values(TaskStatus).includes(status)) {
      return {
        error: "Invalid status",
      };
    }

    if (page && isNaN(page)) {
      return {
        error: "Invalid page number",
      };
    }

    if (limit && isNaN(limit)) {
      return {
        error: "Invalid limit number",
      };
    }

    return this.tasksService.getFilteredTasks(status, page, limit);
  }
}
