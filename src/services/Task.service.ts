import { Injectable } from "@nestjs/common";
import { Course } from "src/entities/Course";
import { Task } from "src/entities/Task";
import { getRepository } from "typeorm";

@Injectable()
export class TaskService {
    create(task: Task) {
        const taskRepository = getRepository(Task)
        taskRepository.save(task);
    }

    getTasks() {
        const taskRepository = getRepository(Task)
        return taskRepository.find()
    }

    getTaskId(taskId: number) {
        const taskRepository = getRepository(Task)
        return taskRepository.findOne(taskId)
    }

    update(task: Task, taskId: number) {
        const taskRepository = getRepository(Task)
        return taskRepository.update(taskId,task)
    }

    delete(taskId: number) {
        const taskRepository = getRepository(Task)
        return taskRepository.delete(taskId)
    }

}