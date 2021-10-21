import { Injectable } from "@nestjs/common";
import { Course } from "src/entities/Course";
import { Instructor } from "src/entities/Instructor";
import { Student } from "src/entities/Student";
import { getRepository } from "typeorm";
import { StudentService } from "./Student.service";

@Injectable()
export class CourseService {
    constructor(private studentService: StudentService){

    }

    create(course: Course) {
        const courseRepository = getRepository(Course)
        courseRepository.save(course);
    }

    getCoursesByInstructor(instructor: Instructor) {
        const courseRepository = getRepository(Course)
        return courseRepository.find({where: {instructor: instructor }})
    }
    
    getCourses() {
        const courseRepository = getRepository(Course)
        return courseRepository.find()
    }

    getCourseId(courseId: number) {
        const courseRepository = getRepository(Course)
        return courseRepository.findOne(courseId)
    }

    update(course: Course, courseId: number) {
        const courseRepository = getRepository(Course)
        return courseRepository.update(courseId,course)
    }

    delete(courseId: number) {
        const courseRepository = getRepository(Course)
        return courseRepository.delete(courseId)
    }

    async subscription(courseId,studentId) {
        const courseRepository = getRepository(Course)
        const student: Student = await this.studentService.getStudentById(studentId);
        let course: Course = await courseRepository.findOne(courseId);

        course.students.push(student);
        courseRepository.save(course);
    }
}