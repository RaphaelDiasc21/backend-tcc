import { Injectable } from "@nestjs/common";
import { Student } from "src/entities/Student";
import { getRepository } from "typeorm";

@Injectable()
export class StudentService {
    create(student: Student) {
        const studentRepository = getRepository(Student)
        studentRepository.save(student)
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
}