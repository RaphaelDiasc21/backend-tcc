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
        return await this.courseService.getCourses()
    }

    @Get(":id")
    find(@Param() params) {
        return this.courseService.getCourseId(params.id)
    }

    @Get("/instructor/:instructor_id")
    async findByInstructor(@Param() params) {
        const instructor: Instructor = await this.instructorService.getInstructorById(params.instructor_id)
        return await this.courseService.getCoursesByInstructor(instructor)
    }

    @Post(":instructor_id")
    async create(@Body() course: Course,@Param() params) {
        const instructor: Instructor = await this.instructorService.getInstructorById(params.instructor_id)
        course.instructor = instructor
        this.courseService.create(course)
        return course
    }

    @Post("/subscription/:course_id/student/:student_id")
    async subscription(@Param() params) {
        this.courseService.subscription(params.course_id,params.student_id)
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