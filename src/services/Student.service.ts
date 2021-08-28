import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Course } from "src/entities/Course";
import { Student } from "src/entities/Student";
import { getRepository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentService {
    async create(student: Student) {
        const studentRepository = getRepository(Student)
        let studentFinded = await this.getStudentByEmail(student.email)
       
        if(studentFinded.length == 0) {
            student.password = await bcrypt.hash(student.password, 10);
            return studentRepository.save(student)
        }

        throw new HttpException('Estudante já cadastrado', HttpStatus.CONFLICT)
    }

    async getStudentByEmail(email: string) {
        const instructorRepository = getRepository(Student)
        return await instructorRepository.find({where: { email: email }})
    }

    getStudents() {
        const studentRepository = getRepository(Student)
        return studentRepository.find();
    }

    getStudentById(studentId: number) {
        const studentRepository = getRepository(Student)
        return studentRepository.findOne(studentId)
    }

    update(student: Student, studentId: number) {
        const studentRepository = getRepository(Student)
        return studentRepository.update(studentId,student)
    }

    delete(studentId: number) {
        const studentRepository = getRepository(Student)
        return studentRepository.delete(studentId)
    }

    async assignedCourse(studentId: number, courseId: number) {
        const studentRepository = getRepository(Student)
        const courseRepository = getRepository(Course)

        let student: Student = await studentRepository.findOne(studentId)
        let course: Course = await courseRepository.findOne(courseId)

        course.students.push(student)
        return courseRepository.save(course)
    }
}