import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDTO } from "src/dtos/Auth.dto";
import { Course } from "src/entities/Course";
import { Instructor } from "src/entities/Instructor";
import { Student } from "src/entities/Student";
import { getRepository } from "typeorm";
import { InstructorService } from "./Instructor.service";
import { StudentService } from "./Student.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private instructorService: InstructorService,
                private studentService: StudentService) {}

    async searchStudent(student: Student) {
        let studentFetched = await this.studentService.getStudentByEmail(student.email);
        if(studentFetched.length > 0) {
            const isMatched = await bcrypt.compare(student.password,studentFetched[0].password)

            if(isMatched) {    
                return this.jwtService.sign({
                    email: studentFetched[0].email,
                    name: studentFetched[0].firstName + " " + studentFetched[0].lastName
                },{secret: 'secret'})
           }
        }

        throw new HttpException('Usuário não encontrado',HttpStatus.NOT_FOUND)
    }

    async searchInstructor(instructor: Instructor) {
        let instructorFetched = await this.instructorService.getInstructorByEmail(instructor.email);
        if(instructorFetched.length > 0) {
            const isMatched = await bcrypt.compare(instructor.password,instructorFetched[0].password)

            if(isMatched) {    
                return this.jwtService.sign({
                    email: instructorFetched[0].email,
                    name: instructorFetched[0].firstName + " " + instructorFetched[0].lastName
                },{secret: 'secret'})
           }
        }

        throw new HttpException('Usuário não encontrado',HttpStatus.NOT_FOUND)
    }

    async validatePassword(passwordProvided: string, passwordFromDatabase: string) {
        return await bcrypt.compare(passwordProvided,passwordFromDatabase)
    }

    generateJwt(email,firstName,lastName,userType) {
         return this.jwtService.sign({
            email: email,
            name: firstName + " " + lastName,
            userType: userType
        },{secret: 'secret'})
    }
    async authenticateInstructor(authDTO: AuthDTO, instructorFromDatabase: Instructor) {
        const isMatched = await this.validatePassword(authDTO.password, instructorFromDatabase.password)

        if(isMatched) {
            const token = this.generateJwt(instructorFromDatabase.email,instructorFromDatabase.firstName,instructorFromDatabase.lastName,"Instrutor")
            console.log(token)
            return {
                token: token,
                userType: 'Instrutor',
                name: instructorFromDatabase.firstName,
                email: instructorFromDatabase.email
            }
        }

        throw new HttpException('Senha não confere',HttpStatus.BAD_REQUEST)
    }

    async authenticateStudent(authDTO: AuthDTO, studentFromDatabase: Instructor) {
        const isMatched = await this.validatePassword(authDTO.password, studentFromDatabase.password)

        if(isMatched) {
            const token = this.generateJwt(studentFromDatabase.email,studentFromDatabase.firstName,studentFromDatabase.lastName,"Estudante")
            console.log(token)
            return {
                token: token,
                userType: 'Estudante',
                name: studentFromDatabase.firstName,
                email: studentFromDatabase.email
            }
        }

        throw new HttpException('Senha não confere',HttpStatus.BAD_REQUEST)
    }

    async authenticateUser(authDTO:AuthDTO) {
        let studentFetched = await this.studentService.getStudentByEmail(authDTO.email);
        let instructorFetched = await this.instructorService.getInstructorByEmail(authDTO.email);

        if(instructorFetched.length > 0) {
            return this.authenticateInstructor(authDTO,instructorFetched[0])
        }
        
        if(studentFetched.length > 0) {
            return this.authenticateStudent(authDTO,studentFetched[0])
        }

        throw new HttpException('Usuário não encontrado',HttpStatus.BAD_REQUEST)
    }
}