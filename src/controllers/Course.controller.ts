import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Course } from "src/entities/Course";
import { Instructor } from "src/entities/Instructor";
import { CourseService } from "src/services/Course.service";
import { InstructorService } from "src/services/Instructor.service";

@Controller("courses")
export class CourseController {
    constructor(
        private courseService: CourseService,
        private instructorService: InstructorService
    ) {}

    @Get()
    async courses() {
        return this.courseService.getCourses()
    }

    @Get(":id")
    find(@Param() params) {
        return this.courseService.getCourseId(params.id)
    }

    @Post(":instructor_email")
    async create(@Body() course: Course,@Param() params) {
        const instructor: Instructor[] = await this.instructorService.getInstructorByEmail(params.instructor_email)
        course.instructor = instructor[0]
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