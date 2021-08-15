import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { Student } from "./Student";

@Entity()
export class QuestionResponse {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Student)
    studentResponse: string

    @ManyToOne(type => Question)
    question: Question
}