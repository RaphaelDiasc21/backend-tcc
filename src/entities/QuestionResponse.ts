import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { Student } from "./Student";

@Entity()
export class QuestionResponse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    response: string

    @ManyToOne(type => Student, {
        eager: true
    })
    @JoinColumn()
    student: string

    @ManyToOne(type => Question)
    @JoinColumn()
    question: Question
}