import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Course } from "src/entities/Course";
import { CourseService } from "src/services/Course.service";

@Controller("courses")
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get()
    async courses() {
        return this.courseService.getCourses()
    }

    @Get(":id")
    find(@Param() params) {
        return this.courseService.getCourseId(params.id)
    }

    @Post()
    async create(@Body() course: Course) {
        this.courseService.create(course)
        return course
    }

    @Put(":id")
    async update(@Body() course: Course, @Param() params) {
        return this.courseService.update(course, params.id)
    }

    @Delete(":id")
    async delete(@Param() params) {
        return this.courseService.delete(params.id)
    }
}