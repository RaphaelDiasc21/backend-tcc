import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Student } from "src/entities/Student";
import { StudentService } from "src/services/Student.service";

@Controller("students")
export class StudentController {

    constructor(private studentService: StudentService) {}

    @Get()
    async students() {
        return this.studentService.getStudents()
    }

    @Get(":id")
    find(@Param() params) {
        return this.studentService.getStudentById(params.id)
    }

    @Post()
    async create(@Body() student: Student) {
        console.log(student)
        this.studentService.create(student)
        return student
    }

    @Put(":id")
    async update(@Body() student: Student, @Param() params) {
        return this.studentService.update(student, params.id)
    }

    @Delete(":id")
    async delete(@Param() params) {
        return this.studentService.delete(params.id)
    }

    @Post(":id/course/:courseId")
    async assigneCourse(@Param() params) {
        return this.studentService.assignedCourse(params.id,params.courseId)
    }
}
