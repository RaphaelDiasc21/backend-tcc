import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
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
        try {
            return await this.studentService.create(student)
        }catch(e) {
            throw new HttpException('Estudante já cadastrado', HttpStatus.CONFLICT)
        }
        
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
