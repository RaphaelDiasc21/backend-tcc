import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Task } from "src/entities/Task";
import { TaskService } from "src/services/Task.service";

@Controller("tasks")
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    async tasks() {
        return this.taskService.getTasks()
    }

    @Get(":id")
    find(@Param() params) {
        return this.taskService.getTaskId(params.id)
    }

    @Post()
    async create(@Body() task: Task) {
        this.taskService.create(task)
        return task
    }

    @Put(":id")
    async update(@Body() task: Task, @Param() params) {
        return this.taskService.update(task, params.id)
    }

    @Delete(":id")
    async delete(@Param() params) {
        return this.taskService.delete(params.id)
    }
}