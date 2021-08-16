import { Injectable } from "@nestjs/common";
import { Instructor } from "src/entities/Instructor";
import { getRepository } from "typeorm";

@Injectable()
export class InstructorService {
    create(instructor: Instructor) {
        const studentRepository = getRepository(Instructor)
        studentRepository.save(instructor)
    }

    getInstructors() {
        const instructorRepository = getRepository(Instructor)
        return instructorRepository.find();
    }

    getInstructorById(instructorId: number) {
        const instructorRepository = getRepository(Instructor)
        return instructorRepository.findOne(instructorId)
    }

    update(instructor: Instructor, instructorId: number) {
        const instructorRepository = getRepository(Instructor)
        return instructorRepository.update(instructorId,instructor)
    }

    delete(instructorId: number) {
        const instructorRepository = getRepository(Instructor)
        return instructorRepository.delete(instructorId)
    }
}