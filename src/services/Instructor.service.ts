import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Instructor } from "src/entities/Instructor";
import { getRepository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class InstructorService {
    async create(instructor: Instructor) {
        const instructorRepository = getRepository(Instructor)
        let instructorFinded = await this.getInstructorByEmail(instructor.email)
        if(instructorFinded.length == 0) {
            instructor.password = await bcrypt.hash(instructor.password,10);
            return instructorRepository.save(instructor)
        }
        throw new HttpException('Instrutor já cadastrado', HttpStatus.CONFLICT)
    }

    async getInstructorByEmail(email: string) {
        const instructorRepository = getRepository(Instructor)
        return await instructorRepository.find({where: { email: email }})
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