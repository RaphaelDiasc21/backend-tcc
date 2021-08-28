import { Injectable } from "@nestjs/common";
import { Course } from "src/entities/Course";
import { getRepository } from "typeorm";

@Injectable()
export class CourseService {
    create(course: Course) {
        const courseRepository = getRepository(Course)
        courseRepository.save(course);
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

}